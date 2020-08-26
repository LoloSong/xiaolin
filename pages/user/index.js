// pages/user/index.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatar: '',
    firstName: '',
    lastName:'',
    schoolName: '',
    commentsList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserInfo()
    this.getCommentsList()
  },
  /** 获取个人信息 */
  getUserInfo: function () {
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
        avatar: res.data.avatar,
        firstName: res.data.first_name,
        lastName: res.data.last_name,
        schoolName: res.data.school[res.data.school.length - 1].name,
      })
    })
  },
  /** 获取评论列表 */
  getCommentsList: function () {
    app.request({ url: '/wechat/school/comments/member' }).then((res) => {
      if (res.code !== 200) {
        wx.showToast({
          title: res.message,
          icon: 'none',
          duration: 2000
        })
        return
      }
      this.setData({
        commentsList: res.data.items
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