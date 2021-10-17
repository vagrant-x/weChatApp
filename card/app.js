// app.js
App({
  data: {
    appId: "wxfd0c7f65b412832d",
    appSecret: "917d2fe5150e40a1b92e326bc525e095"
  },
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    let this_page = this
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res)
        // 获取用户信息
        wx.getUserInfo({
          success: (res) => {
            wx.setStorage({
              key: "userInfo",
              data: res.userInfo,
              success: function () {
                console.log("保存用户信息到storage成功：", res.userInfo)
              },
            })
          }
        })
        // 获取 openID
        // GET https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code
        let my_url = "https://api.weixin.qq.com/sns/jscode2session?appid=" + this_page.data.appId + "&secret=" + this_page.data.appSecret + "&js_code=" + res.code + "&grant_type=authorization_code"
        wx.request({
          url: my_url,
          data: {},
          method: "GET",
          success: (res) => {
            // 储存openId
            wx.setStorage({
              key: "openID",
              data: res.data.openid,
              success: (res)=>{
                console.log("保存openID成功")
              }
            })
          },
          fail: (res) => {
          },
          complete: (res) => {
          }
        })
      }
    })
  },
  globalData: {
    userInfo: null
  }
})
