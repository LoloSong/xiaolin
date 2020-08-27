// components/tab_bar/index.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  data: {
    selected: 0,
    color: "#000",
    selectedColor: "#000",
    list: [{
      pagePath: "/pages/index/index",
      iconPath: "https://api.collegein.com/images/home_icon.png",
      selectedIconPath: "https://api.collegein.com/images/home_active_icon.png",
      text: "首页"
    }, {
      pagePath: "/pages/school/index",
      iconPath: "https://api.collegein.com/images/school_icon.png",
      selectedIconPath: "https://api.collegein.com/images/school_active_icon.png",
      text: "学校评分"
    }, {
      pagePath: "/pages/user/index",
      iconPath: "https://api.collegein.com/images/user_icon.png",
      selectedIconPath: "https://api.collegein.com/images/user_active_icon.png",
      text: "个人中心"
    }]
  },
  properties: {
    selected: {
      type: Number,
      value: 0
    }
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      const isInfo = wx.getStorageSync('isInfo')
      console.log(isInfo)
      console.log(url)
      if (url === '/pages/school/index') {
        console.log(isInfo)
        if (isInfo) {
          wx.switchTab({ url })
        } else {
          const pages = getCurrentPages()
          const currentPage = pages[pages.length - 1]
          if (currentPage.route !== 'pages/user-modify/index') {
            wx.navigateTo({ url: '/pages/user-modify/index' })
          }
        }
        return
      }
      wx.switchTab({ url })
    }
  }
})
