// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    list: [
      {price: 10,
        name: "人人都会小程序实战",
        coverPath: "../../img/cover.png"
      },
      {price: 0,
        name: "人人都会小程序实战",
        coverPath: "../../img/cover.png"
      },
      {price: 20,
        name: "人人都会小程序实战",
        coverPath: "../../img/cover.png"
      },
      {price: 30,
        name: "人人都会小程序实战",
        coverPath: "../../img/cover.png"
      },
      {price: 40,
        name: "人人都会小程序实战",
        coverPath: "../../img/cover.png"
      },
      {price: 40,
        name: "人人都会小程序实战",
        coverPath: "../../img/cover.png"
      },
      {price: 40,
        name: "人人都会小程序实战",
        coverPath: "../../img/cover.png"
      },
    ],
    // motto: 'Hello World',
    // userInfo: {},
    // hasUserInfo: false,
    // canIUse: wx.canIUse('button.open-type.getUserInfo'),
    // canIUseGetUserProfile: false,
    // canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },
  // // 事件处理函数
  onFree: function(){
    console.log("免费");
    this.onFilter("free")
  },
  onCost: function(){
    console.log("付费");
    this.onFilter("cost")
  },

  onFilter: function(type){
    console.log("type:", type);
    let data = this.data.list;
    let newData = [];
    data.map(d => { 
      if(type == "cost" && d.price > 0){
        newData.push(d)
      }else if(type == "free" && d.price == 0){
        newData.push(d)
      }
    })
    this.setData({
      list: newData
    });
  }

  // bindViewTap() {
  //   wx.navigateTo({
  //     url: '../logs/logs'
  //   })
  // },
  // onLoad() {
  //   if (wx.getUserProfile) {
  //     this.setData({
  //       canIUseGetUserProfile: true
  //     })
  //   }
  // },
  // getUserProfile(e) {
  //   // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
  //   wx.getUserProfile({
  //     desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
  //     success: (res) => {
  //       console.log(res)
  //       this.setData({
  //         userInfo: res.userInfo,
  //         hasUserInfo: true
  //       })
  //     }
  //   })
  // },
  // getUserInfo(e) {
  //   // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
  //   console.log(e)
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  // }
})
