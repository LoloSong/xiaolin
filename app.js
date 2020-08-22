//app.js
App({
  globalData: {
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
  }
})