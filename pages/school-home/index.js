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
    subjectList: [],
    isMessage: false,
    administratorInfo: {
      intro: '',
      reason: '',
      contact: ''
    },
    progress:0,
    content: '',
    average: '',
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
      let commentsList = res.data.items.map(item =>{
        item.progress = app.frac(item.average)
        return item
      })
      this.setData({
        commentsList: commentsList
      })
    })
  },
  showDetail(e) {
    const { comment_id } = e.currentTarget.dataset
    app.request({ url: '/wechat/school/comments/detail', data: { comment_id } }).then((res) => {
      let subjectList = res.data.score.map((item, index) => {
        item.answer = item.pivot.score
        return item
      })
      this.setData({
        subjectList: subjectList,
        member: res.data.member,
        average: res.data.average,
        content: res.data.content,
        progress: app.frac(res.data.average),
        isShowDetail: true
      })
    })
  },
  closeSubjectPopup () {
    this.setData({
      isShowDetail: false
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