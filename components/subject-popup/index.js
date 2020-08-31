// components/subject-popup/index.js
let app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    commentId: {
      type: String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    subjectList: [],
    progress:0,
    content: '',
    average: '',
  },
  attached: function () {
    this.showDetail()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    showDetail() {
      console.log(this.data.commentId)
      wx.showLoading({
        title: '加载中',
      })
      app.request({ url: '/wechat/school/comments/detail', data: { comment_id: this.data.commentId } }).then((res) => {
        wx.hideLoading()
        if (res.code !== 200) {
          wx.showToast({
            title: res.message,
            icon: 'none',
            duration: 2000
          })
          return
        }
        let subjectList = res.data.score.map((item, index) => {
          item.answer = item.pivot.score
          return item
        })
        console.log(subjectList)
        this.setData({
          subjectList: subjectList,
          member: res.data.member,
          average: res.data.average,
          content: res.data.content,
          progress: app.frac(res.data.average)
        })
      })
    },
    closeSubjectPopup () {
      this.triggerEvent('closeSubjectPopup');
    }
  }
})
