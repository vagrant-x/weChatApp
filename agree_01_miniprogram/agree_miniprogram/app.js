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
    // 保存开卡等交易用户信息
    userInfo: {
      address: "广州市天河区华穗路398号冼村街公共集体户",
      birthday: "19930417",
      department: "广州市公安局天河分局",
      end: "20410309",
      from: "20210309",
      gender: "男",
      id: "445121199304173459",
      name: "许卓杰",
      nationality: "汉",

      d_mobile_phone_number: "18814121269",
      d_telephone_number: "020-555555",
      d_accupation: "新一代农民工",
      d_address: "广州市天河区华穗路398号冼村街公共集体户",
      d_postal_code: "000000",
    },
    token: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsiYWRhYXMiXSwic2NvcGUiOlsiZGV2aWNlIl0sImV4cCI6MTYzNDgyMjU3NywiYXV0aG9yaXRpZXMiOlsic3VwZXJfbWFuYWdlciJdLCJqdGkiOiIwOTY3OTFmNS1jMDlhLTRlYTctODgyYy05OWY2Mzc1ODc4NjgiLCJjbGllbnRfaWQiOiJjbGllbnRfY3JlZGVudGlhbHMifQ.hZXSTmM2M9G1dGp0ndUvopnuIGkXemQg2-IeQZwXxnikSWCnjA0aunHp3p3UycVrxJoVQS2k_PUKgAaeqELD4ESOrO6Bx6WNS6TFhMg8l28C77cVVmtEYxb_b9zphqLMj6E-jwayJhfQ21_QM4fx5JPLcQFl-Ca4N3trwBARUZIZsbXIEN7LtJO-mnepO9NDjjfEQpLKcoHDWEDlG18ZHGPpWwM7cqBvgsWE8UTRen2fDvtoJddnYIazaFZEZooPUVWCyRKL5eklHy7GjBTBeyndppt9F11l-_We7qwuht92fLwUlLWbC0obu5NcmgsNLyZziLtOwBJdfkswbFU3LA",  // 请求的token
    controllerId: "0000202B09D7", // 调用外设网关id
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
        success(res) {
          resolve(res)
        },
        fail(res) {
          reject(res)
        }
      })
    })
    return p
  }
})
