// pages/user-modify/index.js
let app = getApp()
Page({
  data: {
    ossConfig: null,
    avatar: '',
    firstName: '',
    lastName: '',
    sex: '',
    sexText: '',
    sexOptions: [{ id: 1, name: '男' }, { id: 2, name: '女' }],
    birthday: '',
    schoolInfoList: [
      {
        id: 0,
        searchName: '',
        school_id: '',
        education: '',
        searchNameList: [],
        start_at: '',
        end_at: ''
      }
    ],
    searchName: '',
    searchNameList: []
  },
  onLoad() {
    this.getOssConfig()
    this.getUserInfo()
  },
  getOssConfig() {
    app.request({ url: '/wechat/member/avatar/upload' }).then((res) => {
      console.log(res)
      if (res.code === 200) {
        this.data.ossConfig = res.data
      }
    })
  },
  getUserInfo() {
    wx.showLoading({
      title: '加载中',
    })
    app.request({ url: '/wechat/member/info/self' }).then((res) => {
      wx.hideLoading()
      if (res.code !== 200) {
        wx.showToast({
          title: res.message,
          icon: 'none',
          duration: 2000
        })
        return
      }
      if (res.data.school.length <= 0) {
        return
      }
      let schoolInfoList = res.data.school.map((item) => {
        item = {
          ...item.detail,
          searchName: item.name
        }
        return item
      })
      this.setData({
        avatar: res.data.avatar,
        firstName: res.data.first_name,
        lastName: res.data.last_name,
        sex: res.data.sex,
        sexText: res.data.sex === 1 ? '男' : res.data.sex === 2 ? '女' : '',
        birthday: res.data.birthday,
        schoolInfoList: schoolInfoList
      })
    })
  },
  uploadAvatar() {
    const _this = this
    wx.chooseImage({
      complete: (res) => {
        const images = res.tempFilePaths[0]
        console.log(images)
        const formData = {
          key: `${_this.data.ossConfig.dir}${images.replace('wxfile://', '').replace('http://tmp/', '')}`, // 这部分接口返回 dir字段
          policy: _this.data.ossConfig.policy, // 接口返回policy字段
          OSSAccessKeyId: _this.data.ossConfig.accessid,  // 接口返回 accessid字段
          success_action_status: '200', // 状态码固定写法
          signature: _this.data.ossConfig.signature, // 接口返回 signature字段
          callback: _this.data.ossConfig.callback  //接口返回 callback 字段
        }
        wx.uploadFile({
          filePath: images,
          name: 'file',
          url: `https://${_this.data.ossConfig.bucket}.${_this.data.ossConfig.host}`,  // 接口返回 https://+ bucket + . + host
          formData: formData,
          complete: (res) => {
            console.log()
            this.setData({
              avatar: `https://${_this.data.ossConfig.bucket}.${_this.data.ossConfig.host}/${_this.data.ossConfig.dir}${images.replace('wxfile://', '').replace('http://tmp/', '')}`
            })
          } 
        })
      },
    })
  },
  getFirstName(e) {
    this.setData({
      firstName: e.detail.value
    })
    console.log(this.data.firstName)
  },
  getLastName(e) {
    this.setData({
      lastName: e.detail.value
    })
  },
  changeSex(e) {
    const index = e.detail.value
    this.setData({
      sex: this.data.sexOptions[index].id,
      sexText: this.data.sexOptions[index].name
    })
  },
  changeBirthday(e) {
    this.setData({
      birthday: e.detail.value
    })
  },
  getSearchName(e) {
    const _this = this
    const data = e.target.dataset
    let newList = this.data.schoolInfoList.map((item, index) => {
      if (index === data.index) {
        item = {
          ...item,
          searchName: e.detail.value
        }
        if (!item.searchName) {
          item = {
            ...item,
            searchNameList: []
          }
        } else {
          _this.searchSchool(index, e.detail.value)
        }
      }
      return item
    })
    this.setData({
      schoolInfoList: newList
    })
    // if (e.detail.value) {
    //   this.searchSchool(data.index, e.detail.value)
    // }
    // 防抖优化
    // util.debounce(this.searchSchool)
  },
  searchSchool(index, schoolName) {
    let _this = this
    app.request({ url: '/wechat/school/search', data: { key: schoolName } }).then((res) => {
      if (res.code !== 200) {
        wx.showToast({
          title: res.message,
          icon: 'none',
          duration: 2000
        })
        return
      }
      let newList = _this.data.schoolInfoList.map((item, i) => {
        if (i === index) {
          item = {
            ...item,
            searchNameList: res.data
          }
          if (item.searchNameList.length > 0 && item.searchName === item.searchNameList[0].name) {
            item.school_id = item.searchNameList[0].id
          }
        }
        return item
      })
      this.setData({
        schoolInfoList: newList
      })
    })
  },
  selectSchool(e) {
    let data = e.target.dataset
    let newList = this.data.schoolInfoList.map((item, index) => {
      if (index == data.index) {
        item = {
          ...item,
          searchName: data.school_name,
          school_id: data.school_id,
          searchNameList: []
        }
      }
      return item
    })
    this.setData({
      schoolInfoList: newList
    })
  },
  ipuSchoolInfo(e) {
    let data = e.target.dataset
    let newList = this.data.schoolInfoList.map((item, index) => {
      if (index === data.index) {
        item = {
          ...item,
          education: e.detail.value
        }
      }
      return item
    })
    this.setData({
      schoolInfoList: newList
    })
  },
  changeSchoolHours(e) {
    let data = e.target.dataset;
    let newList = this.data.schoolInfoList.map((item, index) => {
      if (index == data.index) {
        item[data.name] = e.detail.value
      }
      return item
    })
    this.setData({
      schoolInfoList: newList
    })
  },
  addSchool() {
    let schoolInfoList = this.data.schoolInfoList,
      item = {
        id: 0,
        searchName: '',
        school_id: '',
        education: '',
        searchNameList: [],
        start_at: '',
        end_at: ''
      }
    schoolInfoList.push(item)
    this.setData({
      schoolInfoList: schoolInfoList
    })
  },
  goBack() {
    wx.navigateBack({
      delta: 1
    });
  },
  comfirm() {
    for (let i = 0; i < this.data.schoolInfoList.length; i++) {
      if (!this.data.schoolInfoList[i].searchName) return app.Tips({title: '请输入您的母校名称'})
      if (!this.data.schoolInfoList[i].school_id) return app.Tips({title:'请选择跟您输入母校对应的学校名称'})
      if (!this.data.schoolInfoList[i].education) return app.Tips({title:'请输入您的学历'})
      if (!this.data.schoolInfoList[i].start_at) return app.Tips({title: '请输入您的入学开始时间'})
      if (!this.data.schoolInfoList[i].end_at) return app.Tips({title: '请输入您的入学结束时间'})
    }
    let school = this.data.schoolInfoList.map((item, index) => {
      item = {
        id: item.id,
        school_id: item.school_id,
        education: item.education,
        start_at: item.start_at,
        end_at: item.end_at
      }
      return item
    })
    let data = {
      avatar: this.data.avatar,
      first_name: this.data.firstName,
      last_name: this.data.lastName,
      sex: this.data.sex,
      birthday: this.data.birthday,
      school: school
    }
    app.request({method: 'POST', url: '/wechat/member/info/update', data}).then((res) => {
      if (res.code !== 200) {
        wx.showToast({
          title: res.message,
          icon: 'none',
          duration: 2000
        })
        return
      }
      wx.switchTab({
        url: '/pages/school/index'
      })
    })
  }
})