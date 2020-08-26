// pages/school/index.js
const app = getApp()
Page({
  data: {
    isShowMask: false,
    searchId: '',
    searchName: '',
    searchNameList: [],
    tag: 1,  // 1综合 2生活
    swiper: [
      { url: '/images/school_swiper1.png' },
      { url: '/images/school_swiper2.png' }
    ],
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
    this.hideMask()
  },
  hideMask() {
    this.setData({
      isShowMask: false
    })
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
    console.log(e.target.dataset.school_name)
    this.setData({
      searchId: e.target.dataset.school_id,
      searchName: e.target.dataset.school_name,
      searchNameList: []
    })
  },
  changeSwiper(e) {
    let { current } = e.detail
    if (current === 0) {
      this.data.tag = 1
    }
    if (current === 1) {
      this.data.tag = 2
    }
    console.log(this.data.tag)
  },
  goScore() {
    if (!this.data.searchId) {
      // 没有找到对应但id
      wx.showToast({
        title: '未匹配到该学校',
        icon: 'none',
        duration: 2000
      })
      return
    }
    // 判断是否评论过
    app.request({ url: '/wechat/school/comments/status', data: { school_id: this.data.searchId, tag: this.data.tag } }).then((res) => {
      if (res.code !== 200) {
        wx.showToast({
          title: res.message,
          icon: 'none',
          duration: 2000
        })
        return
      }
      wx.navigateTo({ url: `/pages/score/index?schoolId=${this.data.searchId}&tag=${this.data.tag}` })
    })
  }
})