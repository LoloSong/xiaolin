// pages/school/index.js
const app = getApp()
Page({
  data: {
    isShowMask: false,
    searchId: '',
    searchName: '',
    searchNameList: [],
    swiper: [
      { url: '/images/school_swiper1.png' },
      { url: '/images/school_swiper2.png'}
    ]
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
  inputFocus() {
    this.setData({
      isShowMask: true
    })
  },
  inputBulr() {
    // this.setData({
    //   isShowMask: false
    // })
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
  selectSchool(e) {
    this.setData({
      searchId: e.target.dataset.school_id,
      searchName: e.target.dataset.school_name,
      searchNameList: []
    })
  },
})