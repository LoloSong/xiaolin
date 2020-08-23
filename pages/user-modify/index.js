// pages/user-modify/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    schoolInfoList:[
      {
        schoolName:'',
        education:'',
        schoolHours:''
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**输入学校信息 */
  ipuSchoolInfo: function (e) {
    console.log(e.target.dataset)
    let that = this, data = e.target.dataset,val = e.detail.value;
    let newList = this.data.schoolInfoList.map((item, index) => {
      if (index == data.index) {
         for (let key in item) {
           if (key == data.tip) {
             item[key] = val
           }
         }
      }
      return item
    })
    this.setData({
      schoolInfoList:newList
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