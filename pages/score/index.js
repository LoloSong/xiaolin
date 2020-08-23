// pages/score/index.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: app.globalData.statusBar,
    subjectList:[
      {
        title:'学生会（Student Association',
        answer:''
      },
      {
        title:'颜值（Appearance）',
        answer:''
      }
    ],
    message:'',
    isAnony: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /** 答题 */
  goAnswer: function (e) {
    console.log(e)
    let that = this,data = e.currentTarget.dataset;
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
      delta:1 //返回上一级页面
    })
  },
  /** 提交 */
  comfirm: function () {

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