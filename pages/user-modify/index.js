// pages/user-modify/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatar: '',
    firstName: '',
    lastName: '',
    schoolInfoList:[
      {
        schoolName:'',
        education:'',
        schoolHours:''
      }
    ]
  },
  uploadAvatar() {
    const _this = this
    wx.chooseImage({
      count: 1,
      success(res) {
        _this.setData({
          avatar: res.tempFilePaths[0]
        })
      }
    })
  },
  getFirstName(e) {
    this.setData({
      firstName: e.detail.value
    })
    console.log(this.data.firstName)
  },
  getLastName(e) {
    this.setData({
      lastName: e.detail.value
    })
    console.log(this.data.firstName)
  }
})