//index.js
//获取应用实例
const app = getApp()
const util = require('../../utils/util')

Page({
  data: {
    list: [],
    statusBarHei: app.globalData.statusBar,
    searchId: '',
    searchName: '',
    searchNameList: []
  },
  onLoad() {
    this.getList()
    // this.getIsInfo()
  },
  onShow() {
    this.clearSearch()
  },
  getList() {
    wx.showLoading({
      title: '加载中',
    })
    app.request({ url: '/wechat/school/index' }).then((res) => {
      wx.hideLoading()
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
    app.request({ url: '/wechat/member/info/status' }).then((res) => {
      // if (res.code !== 200) {
      //   wx.showToast({
      //     title: res.message,
      //     icon: 'none',
      //     duration: 2000
      //   })
      //   return
      // }
      if (res.code === 40002) {
        wx.setStorageSync('isInfo', false)
      } else {
        wx.setStorageSync('isInfo', true)
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
    app.request({ url: '/wechat/school/search', data: { key: this.data.searchName } }).then((res) => {
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
    if (!app.globalData.isLogin) {
      wx.showToast({
        title: '请先登录后查看热评',
        icon: 'none',
        duration: 2000
      })
      return
    }
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
  search() {
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
  }
})
