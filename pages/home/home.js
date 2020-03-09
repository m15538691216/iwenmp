// pages/home/home.js
const app = getApp()
let Api = app.Api
let router = require("../../utils/router.js")


Page({

  data: {
    goodsList: ''
  },

  onShow: function(options) {
    var this_ = this;
    app.get(Api.goods).then(res => {
      this_.setData({
        goodsList: res
      })
    }).catch(err => {
      console.log(err)
    })
  },

  gotoDetails(e) {
    router.push({
      path: 'shopdetails',
      query: {
        id: e.currentTarget.dataset.id
      }
    })
  }

})