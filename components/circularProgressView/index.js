// components/circularProgressView/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    progressSize:{
      type: Number,
      value: 160
    },
    progressBg: {
      type: String,
      value: 'red'
    },
    loopSize: {
      type: Number,
      value: 15
    },
    loopBg: {
      type: String,
      value: 'orange'
    },
    content: Boolean,
    contentBg: {
      type: String,
      value: '#fff'
    },
    percent:{
      type: Number,
      value: 0,
      observer: function(newVal, oldVal){
        if (newVal > 100) newVal = 100
        if (newVal < 0) newVal = 0
        this.setData({ percent: newVal })
      }
    },
    percent_to: {
      type: Number,
      observer: function (newVal, oldVal) {
        this.setData({ percent_to: newVal })
      }
    },
    rotate: {
      type: Boolean,
      observer: function (newVal, oldVal) {
        const that = this
        that.countTimer = setInterval(() => {
          if (this.data.count <= 100) {
            that.setData({
              percent: that.data.count / (100 / that.data.percent_to)
            })
            that.data.count++;
          } else {
            clearInterval(that.countTimer);
          }
        }, 10)
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    count: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
