// components/tab_bar/index.js
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
      iconPath: "/images/home_icon.png",
      selectedIconPath: "/images/home_active_icon.png",
      text: "首页"
    }, {
      pagePath: "/pages/score/index",
      iconPath: "/images/school_icon.png",
      selectedIconPath: "/images/school_active_icon.png",
      text: "学校评分"
    }, {
      pagePath: "/pages/user/index",
      iconPath: "/images/user_icon.png",
      selectedIconPath: "/images/user_active_icon.png",
      text: "个人中心"
    }]
  },
  properties: {
    selected: {
      type: Number,
      value: 0
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
    }
  }
})
