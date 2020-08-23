//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    list: [],
    userInfo: {},
    statusBarHei: app.globalData.statusBar,
    schoolName: '',
    schoolNameList: []
  },
  onLoad() {
    this.getList()
    // app.request('123', '223')
    return
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getList() {
    app.request('/wechat/school/index').then((res) => {
      console.log(res)
      if (res.code !== 200) {
        wx.showToast({
          title: res.message,
          icon: 'none',
          duration: 2000
        })
        return
      }
      this.setData({
        list: res.data
      })
    })
  },
  /** 文本框输入 */
  ipuText(e) {
    this.setData({
      schoolName: e.detail.value
    })
  },
  /**搜索 */
  search: function () {

  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
