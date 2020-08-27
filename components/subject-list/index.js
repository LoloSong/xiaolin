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
    },
    isTap: {
      type: Boolean,
      value: true
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
      if (!this.data.isTap) return
      let that = this,data = e.currentTarget.dataset;
      this.triggerEvent('goAnswer', {'data': data})
    }
  }
})
