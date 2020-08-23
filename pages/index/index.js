//index.js
//获取应用实例
const app = getApp()
const util = require('../../utils/util')

Page({
  data: {
    list: [],
    // userInfo: {},
    statusBarHei: app.globalData.statusBar,
    searchId: '',
    searchName: '',
    searchNameList: []
  },
  onLoad() {
    this.getList()
    this.getIsInfo()
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse) {
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }
  },
  onShow() {
    this.clearSearch()
  },
  getList() {
    app.request('/wechat/school/index').then((res) => {
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
  getIsInfo() {
    app.request('/wechat/member/info/status').then((res) => {
      if (res.code === 40002) {
        wx.setStorageSync('isInfo', false)
      }
    })
  },
  ipuText(e) {
    this.setData({
      searchName: e.detail.value
    })
    if (!this.data.searchName) {
      this.setData({ searchNameList: [] })
      return
    }
    this.searchSchool()
    // 防抖优化
    // util.debounce(this.searchSchool)
  },
  searchSchool() {
    app.request('/wechat/school/search', { key: this.data.searchName }).then((res) => {
      if (res.code !== 200) {
        wx.showToast({
          title: res.message,
          icon: 'none',
          duration: 2000
        })
        return
      }
      this.setData({
        searchNameList: res.data
      })
    })
  },
  goSchoolHome(e) {
    const schoolId = e.target.dataset.school_id
    wx.navigateTo({ url: `/pages/school-home/index?id=${schoolId}` })
  },
  selectSchool(e) {
    this.setData({
      searchId: e.target.dataset.school_id,
      searchName: e.target.dataset.school_name,
      searchNameList: []
    })
  },
  search () {
    if (this.data.searchId) {
      // 选过学校列表
      wx.navigateTo({ url: `/pages/school-home/index?id=${this.data.searchId}` })
    } else if (this.data.searchNameList.length > 0 && this.data.searchNameList[0].name === this.data.searchName) {
      // 没选过学校列表但输入与第一个匹配
      wx.navigateTo({ url: `/pages/school-home/index?id=${this.data.searchNameList[0].id}` })
    } else {
      // 没有找到对应但id
      wx.showToast({
        title: '未匹配到该学校',
        icon: 'none',
        duration: 2000
      })
    }
  },
  clearSearch() {
    this.setData({
      searchId: '',
      searchName: '',
      searchNameList: []
    })
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
