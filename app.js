//app.js
App({
  globalData: {
    baseUrl: 'https://api.collegein.com',
    userInfo: null,
    custom: 0,
    customBar: 0,
    statusBar: 0
  },
  onLaunch: function () {
    // 展示本地存储能力
    let self = this
    let systemInfo = wx.getSystemInfoSync()
    self.globalData.statusBar = systemInfo.statusBarHeight;
    console.log(systemInfo)
    if (wx.getMenuButtonBoundingClientRect) {
      let custom = wx.getMenuButtonBoundingClientRect();
      self.globalData.custom = custom;
      self.globalData.customBar = (custom.top - systemInfo.statusBarHeight) * 2 + custom.height;//标题栏的高度
    }
  },
  request({method = 'GET', url, data}) {
    const _this = this
    const token = wx.getStorageSync('token')
    if (!token) {
      wx.reLaunch({
        url: '/pages/login/index',
      })
      return
    }
    return new Promise((resolve) => {
      wx.request({
        url: `${_this.globalData.baseUrl}${url}`,
        data,
        method: method,
        header: {
          'Authorization': token
        },
        success(res) {
          resolve(res.data)
        },
        fail() {
          _this.requestFail()
        }
      })
    })
  },
  requestFail() {
    wx.showToast({
      title: `请求失败，请检查网络`,
      icon: 'none',
      duration: 2000
    })
  }
})