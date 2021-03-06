// pages/login/index.js
let app = getApp()
Page({
  data: {
    statusBarHei: app.globalData.statusBar,
    narBarHei: app.globalData.customBar,
    avatarUrl: '', // 微信头像
    nickname: ''  // 微信昵称
  },
  bindGetUserInfo(e) {
    if (e.detail.userInfo) {
      this.data.avatarUrl = e.detail.userInfo.avatarUrl
      this.data.nickname = e.detail.userInfo.nickName
      this.login()
    } else {
      wx.showToast({
        title: '请先完成微信授权',
        icon: 'none',
        duration: 2000
      })
    }
  },
  login() {
    let _this = this
    wx.showLoading({
      title: `登录中`,
      mask: true
    })
    wx.login({
      success(res) {
        if (res.code) {
          wx.request({
            url: `${app.globalData.baseUrl}/wechat/member/login`,
            method: 'POST',
            data: {
              js_code: res.code,
              avatar: _this.data.avatarUrl,
              nickname: _this.data.nickname
            },
            success(res) {
              wx.hideLoading()
              if (res.data.code !== 200) {
                wx.showToast({
                  title: res.data.message,
                  icon: 'none',
                  duration: 2000
                })
                return
              }
              wx.setStorageSync('token', res.data.data.token)
              wx.setStorageSync('oepnid', res.data.data.openid)
              wx.reLaunch({
                url: '/pages/index/index',
              })
            },
            fail() {
              app.requestFail()
            }
          })
        } else {
          wx.showToast({
            title: `登录失败${res.errMsg}`,
            icon: 'none',
            duration: 2000
          })
        }
      },
      fail() {
        app.requestFail()
      }
    })
  }
})