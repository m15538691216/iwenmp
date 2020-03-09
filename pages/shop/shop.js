// pages/shop/shop.js
const app = getApp()
let Api = app.Api

Page({

  data: {
    list: '',
    allprice: 0,
    allchexked:'',
    scroll_height:0
  },

  onShow: function (options) {
    var this_ = this;
    let windowHeight = wx.getSystemInfoSync().windowHeight // 屏幕的高度
    let windowWidth = wx.getSystemInfoSync().windowWidth // 屏幕的宽度
    this.setData({
      scroll_height: windowHeight * 750 / windowWidth - 96
    })

    app.get(Api.goodscarlist, {
    }).then(res => {
      this_.setData({
        list: res
      })
    }).catch(err => {
      console.log(err)
    })

  },

  bandjian: function (res) {
    var this_ = this;
    var plist = this_.data.list;
    var index = res.currentTarget.dataset.index;
    if (plist[index].shopnum > 1) {
      plist[index].shopnum--
    }
    this_.setData({
      list: plist
    })
    this_.allPrice();
  },

  bandjia: function (res) {
    var this_ = this;
    var plist = this_.data.list;
    var index = res.currentTarget.dataset.index;
    if (plist[index].shopnum < 99) {
      plist[index].shopnum++
    }
    this_.setData({
      list: plist
    })
    console.log(plist)
    this_.allPrice();
  },
  //删除按钮
  bandDel:function(){
    var this_ = this;
    var plist = this_.data.list;
    var arr = [];
    for(var i = 0 ; i<plist.length;i++){
      if(plist[i].checked == true){
        arr.push(plist[i]._id);
      }
    }
    app.get(Api.delgoodscar, {
      arr:JSON.stringify(arr)
    }).then(res => {
      app.get(Api.goodscarlist, {
      }).then(res => {
        this_.setData({
          list: res
        })
        this_.setData({
          allchexked : '',
          allprice: 0
        })
      }).catch(err => {
        console.log(err)
      })
      
    }).catch(err => {
      console.log(err)
    })

  },
  //单选按钮
  checkboxChange: function (e) {
    var this_ = this;
    var shopnum = 0;
    var plist = this_.data.list
    var index=e.currentTarget.dataset.index;
    if (plist[index].checked == '' || plist[index].checked == null){
      plist[index].checked = true;
    }else{
      plist[index].checked = '';
    }
    for(var i =0;i<plist.length;i++){
      if (plist[i].checked == true){
        shopnum += 1 ;
      }
    }
    if(shopnum == plist.length){
      this_.setData({
        allchexked : true
      })
    }else{
      this_.setData({
        allchexked: ''
      })
    }
    this_.setData({
      list:plist
    })
    this_.allPrice();
  },
  //全选按钮
  allcheckboxChange:function(){
    var this_ = this;
    var plist = this_.data.list;
    if (this_.data.allchexked==''){
      for(var i = 0 ;i<plist.length;i++){
        plist[i].checked = true;
      }
      this_.setData({ 
        allchexked : true,
        list:plist
        })
    }else{
      for (var i = 0; i < plist.length; i++) {
        plist[i].checked = '';
      }
      this_.setData({ 
        allchexked : '',
        list: plist
        })
    }
    this_.allPrice();

  },
  //计算价格
  allPrice:function(){
    var this_ =this ;
    var total = 0;
    var plist = this_.data.list
    for(var i =0 ; i<plist.length;i++){
      if(plist[i].checked == true){
        total += Number(plist[i].shopnum * plist[i].price);
      }
      this_.setData({
        allprice: total
      })
    }
  },
  //立即购买
  bandPay:function(){
    var this_ = this ;
    var plist = this_.data.list.filter(item=>item.checked == true);
    for(var i = 0;i<plist.length;i++){
      if (plist[i].num <= 0 || plist[i].shopnum>plist[i].num){
        wx.showToast({
          mask: true,
          title: "已选商品库存不足",
          icon: "none"
        })
      }
    }
  }

})