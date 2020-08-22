Component({
  /**
   * 组件的属性列表
   */
  externalClasses: ['bottom-class'], //外部样式类
  options: {
    multipleSlots: true // 在组建定义时的选项中启用多slot支持
  },
  properties: {
    scrollTop: {
      type: String,
      value: ''
    },
    scrollHeight: {
      type: String,
      value: '100%'
    },
    pushLoading: {
      type: Boolean,
      value: false,
      observer: function (newVal, oldVal) {
      }
    },
    pushLoadingText: {
      type: String,
      value: '',
    },
    showBottomInfo: { // 显示底部信息
      type: Boolean,
      value: false
    },
    cusStyle: {
      type: String,
      value: '',
    },
  },
  /**组件所在页面的生命周期声明对象 */
  pageLifetimes: {
    show() { // 页面被展示
    },
  },
  /**
   * 组件的初始数据,私有数据，可用于模板渲染
   */
  data: {
    scrollEnable: false,
    bottomFlag: false,
    newmark: 0,
    startmark:0
  },
  /**
   * 组件的方法列表
   */
  methods: {
    touchstart: function (e) {
      let pageY = (e.touches[0] || e.changedTouches[0]).pageY
      this.data.startmark = this.data.newmark = pageY
    },
    touchmove: function (e) {
      let pageY = (e.touches[0] || e.changedTouches[0]).pageY
      this.data.newmark = pageY

      let dis = pageY - this.data.startmark

      if (dis <= -30 && this.data.bottomFlag) {
        this.triggerEvent('loadMore', {e: e})
        this.data.bottomFlag = false
      }
    },
    onTolower: function (e) {
      // console.log('触底了')
      this.data.bottomFlag = true
    }
  }
})
