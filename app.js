//app.js
App({
  globalData: {
    isLogin: false,
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
  onShow() {
    this.checkLogin()
  },
  checkLogin() {
    // 判断是否登录
    if (wx.getStorageSync('token')) {
      this.globalData.isLogin = true
    } else {
      this.globalData.isLogin = false
    }
  },
  request({method = 'GET', url, data}) {
    const _this = this
    const token = wx.getStorageSync('token')
    return new Promise((resolve) => {
      wx.request({
        url: `${_this.globalData.baseUrl}${url}`,
        data,
        method: method,
        header: {
          'Authorization': token
        },
        success(res) {
          if (res.data.code === 401) {
            wx.removeStorageSync('token')
            wx.removeStorageSync('openid')
          }
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
  },
  Tips: function (opt, to_url) {
    if (typeof opt == 'string') {
      to_url = opt;
      opt = {};
    }
    var title = opt.title || '', icon = opt.icon || 'none', endtime = opt.endtime || 2000;
    if (title) wx.showToast({ title: title, icon: icon, duration: endtime })
    if (to_url != undefined) {
      if (typeof to_url == 'object') {
        var tab = to_url.tab || 1, url = to_url.url || '';
        switch (tab) {
          case 1:
            //一定时间后跳转至 table
            setTimeout(function () {
              wx.switchTab({
                url: url
              })
            }, endtime);
            break;
          case 2:
            //跳转至非table页面
            setTimeout(function () {
              wx.navigateTo({
                url: url,
              })
            }, endtime);
            break;
          case 3:
            //返回上页面
            setTimeout(function () {
              wx.navigateBack({
                delta: parseInt(url),
              })
            }, endtime);
            break;
          case 4:
            //关闭当前所有页面跳转至非table页面
            setTimeout(function () {
              wx.reLaunch({
                url: url,
              })
            }, endtime);
            break;
          case 5:
            //关闭当前页面跳转至非table页面
            setTimeout(function () {
              wx.redirectTo({
                url: url,
              })
            }, endtime);
            break;
        }
  
      }else if(typeof to_url == 'function'){
        setTimeout(function () { 
          to_url && to_url();
        }, endtime);
      }else{
        //没有提示时跳转不延迟
        setTimeout(function () {
          wx.navigateTo({
            url: to_url,
          })
        }, title ? endtime : 0);
      }
    }
  },
  frac (score) {
    return score * 100 / 5
  }
})