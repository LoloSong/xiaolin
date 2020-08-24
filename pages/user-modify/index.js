// pages/user-modify/index.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatar: '',
    firstName: '',
    lastName: '',
    sexId: '',
    sex: '',
    sexOptions: [{ id: 1, name: '男' }, { id: 2, name: '女' }],
    birthday: '',
    schoolInfoList:[
      {
        searchName:'',
        school_id:'',
        education:'',
        searchNameList: [],
        schoolHours:{
          start_at:'',
          end_at:''
        }
      }
    ],
    searchName:'',
    searchNameList:[]
  },
  uploadAvatar() {
    const _this = this
    wx.chooseImage({
      count: 1,
      success(res) {
        _this.setData({
          avatar: res.tempFilePaths[0]
        })
      }
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
    console.log(this.data.lastName)
  },
  getSearchName(e) {
    let data = e.target.dataset, that = this;
    let newList = this.data.schoolInfoList.map((item, index) => {
      if (index == data.index) {
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
          that.searchSchool(index, e.detail.value)
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
    let that = this;
    app.request('/wechat/school/search', { key: schoolName }).then((res) => {
      if (res.code !== 200) {
        wx.showToast({
          title: res.message,
          icon: 'none',
          duration: 2000
        })
        return
      }
      let newList = that.data.schoolInfoList.map((item, i) => {
        if (i == index) {
          item = {
            ...item,
            searchNameList: res.data
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
    console.log(data.index)
    let newList = this.data.schoolInfoList.map((item, index) => {
      if (index == data.index) {
        item = {
          ...item,
          searchName: data.school_name,
          school_id: data.school_id,
          searchNameList:[]
        }
        console.log(item)
      }
      return item
    })
    this.setData({
      schoolInfoList:newList
    })
  },
  changeSex(e) {
    const index = e.detail.value
    console.log(index)
    this.setData({
      sexId: this.data.sexOptions[index].id,
      sex: this.data.sexOptions[index].name
    })
  },
  changeBirthday(e) {
    this.setData({
      birthday: e.detail.value
    })
  },
  changeSchoolHours (e) {
    let data = e.target.dataset;
    let newList = this.data.schoolInfoList.map((item, index) => {
      if(index == data.index) {
        item.schoolHours = {
          ...item.schoolHours,
          [data.name]:e.detail.value
        }
      }
      return item
    })
    this.setData({
      schoolInfoList: newList
    })
  },
  ipuSchoolInfo (e) {
    console.log(e.detail.value)
    let data = e.target.dataset;
    let newList = this.data.schoolInfoList.map((item, index) => {
      console.log(index, data.index)
      if (index == data.index) {
        item = {
          ...item,
          education:e.detail.value
        }
        console.log(item)
      }
      return item
    })
    this.setData({
      schoolInfoList: newList
    })
  },
  addSchool () {
    let schoolInfoList = this.data.schoolInfoList,
        item = {
          schoolName:'',
          education:'',
          schoolHours:{
            beginTime:'',
            endTime:''
          }
        }
    schoolInfoList.push(item)
    this.setData({
      schoolInfoList: schoolInfoList
    })
  },
  goBack () {
    wx.navigateBack({
      delta: 1
    });
  },
  comfirm () {
    let school = this.data.schoolInfoList.reduce((prev, cur) => {
      prev.push({
        school_id: cur.school_id,
        education: cur.education,
        start_at: cur.schoolHours.start_at,
        end_at: cur.schoolHours.end_at,
        id: 0
      })
      return prev
    }, [])
    let data = {
      avatar: this.data.avatar,
      first_name: this.data.firstName,
      last_name: this.data.lastName,
      sex: this.data.sexId,
      birthday: this.data.birthday,
      school:school
    }
    app.request('/wechat/member/info/update', data, "POST").then((res) => {
      if (res.code !== 200) {
        wx.showToast({
          title: res.message,
          icon: 'none',
          duration: 2000
        })
        return
      }
      wx.navigateTo({
        url: '/pages/school/index'
      })
    })
  }
})