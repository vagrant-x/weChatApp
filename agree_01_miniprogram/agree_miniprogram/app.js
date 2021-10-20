// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })

  },
  globalData: {
    img_service: "https://www.xiongweixp.tech", // 备案服务器地址
    userInfo: {}, // 保存开卡等交易用户信息
    token: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsiYWRhYXMiXSwic2NvcGUiOlsiZGV2aWNlIl0sImV4cCI6MTYzNDc2MjM1MSwiYXV0aG9yaXRpZXMiOlsic3VwZXJfbWFuYWdlciJdLCJqdGkiOiJmYTU3YjY3ZC1iYjg5LTQwMDYtYjI4My02NjdkODRlZDEwODYiLCJjbGllbnRfaWQiOiJjbGllbnRfY3JlZGVudGlhbHMifQ.NVM8sfY9okawt6T186_Venz4FM7zOHPZq5kMIks7dn_Myl1_m7Pn5iGjS2LyAEiqBjfCkJBPOKMY9CxbcrBDAEAC-a6u0L3QhflrSFL5b1JwqqY6yLpbhnbuDQvgQlf_EBz7LGp_mWt4hlQReY-6Se9QCAAkqOxtYEm2Gnflv9HQ5UnTLq1ikuV3IIFIllGGqyb5NB4Gq8hoFH2YmD-Y9KeTuv2JI22ixzCW2k0jCxPmotZh-G9Bl0YyU4cHXcJenD7DljLstjZwUYFC5tJ720joqWqeGFN34S0PhEDrCrS2rZ7BnURXzXKywV86iPHhY9teteJwb-HAIQJ9VcAGLw",  // 请求的token
    controllerId: "", // 调用外设网关id
    url: {
      url_token: "https://www.xiongweixp.tech/adaas/token?grant_type=client_credentials&scope=device&client_id=client_credentials&client_secret=123456",  // 免用户请求token连接
    }
  },
  deivce: {
  },
  // 定义全局方法
  call_device: function (controllerId, deviceType, method, req_body) {
    let app = getApp()
    let p = new Promise(function (resolve, reject) {
      let bearer_token = 'Bearer ' + app.globalData.token
      console.log("bearer_token :", bearer_token)
      let url1 = "https://www.xiongweixp.tech/adaas/devices?token=" + controllerId + "&deviceType=" + deviceType + "&method=" + method
      console.log("调用外设 url:", url1)
      wx.request({
        url: url1,
        method: "POST",
        data: req_body,
        header: {
          'content-type': 'application/json', // 默认值
          'Authorization': bearer_token, //token
        },
        success(res){
          resolve(res)
        },
        fail(res){
          reject(res)
        }
      })
    })
    return p
  }
})
