// pages/shopdetails/shopdetails.js
const app = getApp()
let Api = app.Api


Page({

  data: {
    list: '',
    num: 1
  },

  onLoad: function (options) {
    var this_ = this;
    app.get(Api.goodsDetail, {
      id: options.id
    }).then(res => {
      this_.setData({
        list: res
      })
    }).catch(err => {
      console.log(err)
    })
  },
  bandjian: function () {
    var this_ = this;
    if (this_.data.num > 1) {
      this_.data.num--
    }
    this_.setData({
      num: this_.data.num
    })

  },
  bandjia: function () {
    var this_ = this;
    if (this_.data.num < 99) {
      this_.data.num++
    }
    this_.setData({
      num: this_.data.num
    })
  },
  bandadd: function (re) {
    var this_ = this;
    console.log(re.currentTarget.dataset._id)
    app.get(Api.goodscar, {
      id: re.currentTarget.dataset._id,
      num: this_.data.num
    }).then(res => {
      
    }).catch(err => {
      console.log(err)
    })


  }


})