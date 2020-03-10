// pages/user/user.js
const app = getApp()
let store = require("../../utils/store.js")
let router = require("../../utils/router.js")
let Api = app.Api

Page({
  data: {
    userId: store.getItem("userId"),
    avatarUrl: '',
    nickName: '',
  },
  onLoad: function() {
    // 判断用户是否登录
    if (!this.data.userId) {
      this.getSession();
    }  
  },
  onShow:function(){
    var this_ =this;
    if (store.getItem("user") != ''){
      this_.setData({
        avatarUrl: JSON.parse(store.getItem("user")).avatarUrl,
        nickName: JSON.parse(store.getItem("user")).nickName
      })
    }
    
  },
  // 获取登录的code
  getSession() {
    wx.login({
      success: res => {
        if (res.code) {
          app.get(Api.getSession, {
            code: res.code
          }, {
            toast: false,
            loading: false
          }).then(res => {
            store.setItem("openId", res.openid);
            console.log(res)
            
          }).catch(err => {
            console.log(err.message)
          })
        }
      }
    })
  },
  getUserInfo(e) {
    let userInfo = e.detail.userInfo;
    userInfo.openid = store.getItem("openId");
    app.post(Api.login, {
      'userInfo': JSON.stringify(userInfo)
    }).then(res => {
      store.setItem('userId', res.userId);
      store.setItem('user', JSON.stringify(userInfo))
      this.setData({
        userId: res.userId,
        avatarUrl: userInfo.avatarUrl,
        nickName:userInfo.nickName
      })
    }).catch(err => {
      console.log(err)
    })
  }
})