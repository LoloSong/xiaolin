// pages/school-home/index.js
const app = getApp()
Page({
  data: {
    tabIndex: 0,
    schoolId: '',
    name: '', // 学校姓名
    logo: '', // 学校logo
    score: 0, // 综合评分
    desc: '', // 学校简介
    imgList: [],  // 相册列表
    commentsList: [], // 评论列表
    subjectList: [
      {
        title: '学生会（Student Association',
        answer: ''
      },
      {
        title: '颜值（Appearance）',
        answer: ''
      }
    ],
  },
  onLoad(options) {
    this.data.schoolId = options.id || ''
    this.getSchoolInfo()
    this.getCommentsList()
  },
  getSchoolInfo() {
    app.request({ url: '/wechat/school/info', data: { school_id: this.data.schoolId } }).then((res) => {
      if (res.code !== 200) {
        wx.showToast({
          title: res.message,
          icon: 'none',
          duration: 2000
        })
        return
      }
      this.setData({
        name: res.data.name,
        logo: res.data.logo,
        score: res.data.score,
        desc: res.data.desc,
        imgList: res.data.photos
      })
    })
  },
  getCommentsList() {
    app.request({ url: '/wechat/school/comments', data: { school_id: this.data.schoolId } }).then((res) => {
      if (res.code !== 200) {
        wx.showToast({
          title: res.message,
          icon: 'none',
          duration: 2000
        })
        return
      }
    })
  },
  /** 切换tab */
  changeTab: function (e) {
    console.log(e)
    this.setData({
      tabIndex: e.currentTarget.dataset.index
    })
  },
  /** 答题 */
  goAnswer: function (e) {
    console.log(e)
    let that = this, data = e.detail.data;
    let newList = that.data.subjectList.map((item, index) => {
      if (index == data.index) {
        item.answer = data.answer
      }
      return item
    })
    this.setData({
      subjectList: newList
    })
  }
})