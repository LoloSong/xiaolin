// pages/score/index.js
let app = getApp()
Page({
  data: {
    schoolId: '',
    tag: '',
    title: '',
    subjectList: [],
    message: '',
    isAnony: false,
    height: app.globalData.statusBar
  },
  onLoad(options) {
    this.data.schoolId = Number(options.schoolId) || ''
    this.data.tag = Number(options.tag) || ''
    // tag: 1综合 2生活
    if (this.data.tag === 1) {
      this.setData({ title: '学校综合评分' })
    }
    if (this.data.tag === 2) {
      this.setData({ title: '校园生活评分' })
    }
    this.getList()
  },
  getList() {
    wx.showLoading({
      title: '加载中',
    })
    app.request({
      url: '/wechat/school/comments/config',
      data: {
        tag: this.data.tag,
        school_id: this.data.schoolId
      }
    }).then((res) => {
      wx.hideLoading()
      if (res.code !== 200) {
        wx.showToast({
          title: res.message,
          icon: 'none',
          duration: 2000
        })
        return
      }
      let list = res.data.map((item) => {
        item.answer = ''
        return item
      })
      this.setData({
        subjectList: list
      })
    })
  },
  /** 答题 */
  goAnswer (e) {
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
  /** 输入留言 */
  ipuMessage: function (e) {
    this.setData({
      message: e.detail.value
    })
  },
  /** 是否匿名 */
  goAnony: function (e) {
    let that = this, isAnony = this.data.isAnony;
    that.setData({
      isAnony: !isAnony
    })
  },
  /**返回 */
  goback: function () {
    wx.navigateBack({
      delta: 1 //返回上一级页面
    })
  },
  /** 提交 */
  comfirm: function () {
    for (var i = 0; i < this.data.subjectList.length; i++) {
      if (!this.data.subjectList[i].answer) return app.Tips({title: '请选择您的答案'})
    }
    if (!this.data.message) return app.Tips({title: '请输入留言'})
    let data = {
      school_id: this.data.schoolId,
      tag: this.data.tag,
      content: this.data.message,
      type: this.data.isAnony ? 1 : 0,
      select: this.data.subjectList.reduce((prev, cur, index) => {
        if (index != this.data.subjectList.length - 1) {
          prev += `${cur.id}:${cur.answer};`
        } else {
          prev += `${cur.id}:${cur.answer}`
        }
        return prev
      }, '')
    }
    app.request({method: 'POST', url: '/wechat/school/comments/add', data}).then(res=> {
      if (res.code != '200') return app.Tips({title: res.message})
      app.Tips({title: '已提交您的评论'}, {tab: 1, url: '/pages/user/index'})
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})