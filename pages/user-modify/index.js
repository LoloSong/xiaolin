// pages/user-modify/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatar: '',
    firstName: '',
    lastName: '',
    sexId: '',
    sex: '',
    sexOptions: [{ id: 1, name: '男' }, { id: 2, name: '女' }],
    birthday: '',
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
  },
  changeSex(e) {
    const index = e.detail.value
    console.log(index)
    this.setData({
      sexId: this.data.sexOptions[index].id,
      sex: this.data.sexOptions[index].name
    })
  },
  changeBirthday(e) {
    this.setData({
      birthday: e.detail.value
    })
  }
})