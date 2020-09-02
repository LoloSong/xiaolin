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
    isShowDetail: false, // 详细评分弹窗
    isMessage: false,
    administratorInfo: {
      intro: '',
      reason: '',
      contact: ''
    },
    commentId: '',
    isShow: false,
    lastTapTime: 0
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
    wx.showLoading({
      title: '加载中',
    })
    app.request({ url: '/wechat/school/comments', data: { school_id: this.data.schoolId } }).then((res) => {
      wx.hideLoading()
      if (res.code !== 200) {
        wx.showToast({
          title: res.message,
          icon: 'none',
          duration: 2000
        })
        return
      }
      let commentsList = res.data.items.map(item =>{
        item.progress = app.frac(item.average)
        return item
      })
      this.setData({
        commentsList: commentsList
      })
    })
  },
  showDetail (e) {
    const { comment_id } = e.currentTarget.dataset
    this.setData({
      commentId: comment_id,
      isShowDetail: true
    })
  },
  closeSubjectPopup () {
    this.setData({
      isShowDetail: false
    })
  },
  /** 切换tab */
  changeTab: function (e) {
    if (e.currentTarget.dataset.index == 0) {
      var curTime = e.timeStamp
      var lastTime = e.currentTarget.dataset.time
      let _this = this
      if (curTime - lastTime > 0) {
        if (curTime - lastTime < 300) {
          this.setData({
            isShow: !_this.data.isShow
          })
        }
      }
      this.setData({
        lastTapTime: curTime
      })
    } else {
      this.setData({
        isShow: false
      })
    }
    this.setData({
      tabIndex: e.currentTarget.dataset.index,
    })
  },
  // doubleClick: function (e) {
  //  
  // },
  linkToTag: function (e) {
    app.request({ url: '/wechat/school/comments/status', data: { school_id: this.data.schoolId, tag: e.currentTarget.dataset.tag } }).then((res) => {
      if (res.code !== 200) {
        wx.showToast({
          title: res.message,
          icon: 'none',
          duration: 2000
        })
        return
      }
      wx.navigateTo({ url: `/pages/score/index?schoolId=${this.data.schoolId}&tag=${e.currentTarget.dataset.tag}` })
    })
    // console.log(e.currentTarget.dataset.tag)
    // wx.navigateTo({ url: `/pages/score/index?schoolId=${this.data.schoolId}&tag=${e.currentTarget.dataset.tag}` })
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
  },
  /** 申请成为管理员 */
  applyAdministrator() {
    this.setData({
      isMessage: true
    })
  },
  goBack() {
    this.setData({
      isMessage: false
    })
  },
  /**输入申请成为管理员弹窗 */
  ipuAdminInfo(e) {
    let administratorInfo = this.data.administratorInfo;
    this.setData({
      administratorInfo: {
        ...administratorInfo,
        [e.target.dataset.name]: e.detail.value
      }
    })
  },
  /** 历史评分 */
  goHistoryScore (e) {
    wx.navigateTo({
      url: `/pages/history-score/index?id=${e.currentTarget.dataset.id}`
    })
  }
})