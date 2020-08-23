// components/nav-bar/index.js
let app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    bg:{
      type: String,
      value:'#fff'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    height: app.globalData.statusBar
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
