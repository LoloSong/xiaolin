// components/subject/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item:{
      type: Object
    },
    index:{
      type: Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    goAnswer: function (e) {
      let that = this,data = e.currentTarget.dataset;
      this.triggerEvent('goAnswer', {'data': data})
    }
  }
})
