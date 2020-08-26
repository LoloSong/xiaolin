// pages/user/index.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    memberId: '',
    avatar: '',
    firstName: '',
    lastName: '',
    schoolName: '',
    commentsList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // this.getCommentsList()
  },
  onShow: function () {
    this.getUserInfo()
  },
  /** 获取个人信息 */
  getUserInfo() {
    app.request({ url: '/wechat/member/info/self' }).then((res) => {
      if (res.code !== 200) {
        wx.showToast({
          title: res.message,
          icon: 'none',
          duration: 2000
        })
        return
      }
      this.setData({
        memberId: res.data.id,
        avatar: res.data.avatar,
        firstName: res.data.first_name,
        lastName: res.data.last_name,
        schoolName: res.data.school[res.data.school.length - 1].name,
      })
      this.getCommentsList()
    })
  },
  /** 获取评论列表 */
  getCommentsList() {
    app.request({ url: '/wechat/school/comments/member', data: { member_id: this.data.memberId } }).then((res) => {
      if (res.code !== 200) {
        wx.showToast({
          title: res.message,
          icon: 'none',
          duration: 2000
        })
        return
      }
      let commentsList = res.data.items.map(item => {
        item.progress = app.frac(item.average)
        return item
      })
      this.setData({
        commentsList: commentsList
      })
    })
  },
  /**  修改个人中心 */
  goModifyInfo: function () {
    wx.navigateTo({
      url: '/pages/user-modify/index'
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