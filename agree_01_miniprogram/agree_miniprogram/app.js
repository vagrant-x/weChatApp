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
    token: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsiYWRhYXMiXSwic2NvcGUiOlsiZGV2aWNlIl0sImV4cCI6MTYzNDkyNzU4NywiYXV0aG9yaXRpZXMiOlsic3VwZXJfbWFuYWdlciJdLCJqdGkiOiI5YzM4MjQzNC02MmUyLTQ3ODAtYWQxZi04YzMxNzhlM2JmN2YiLCJjbGllbnRfaWQiOiJjbGllbnRfY3JlZGVudGlhbHMifQ.mFC3WosxWuTuomOoFdwq8Y0Hf2HjQ3F2G6ubYime_Vv728K3RsH8Xad-No0_-xviZKICxSPtWl7P7MjAnlkK4jf4cKdqdOumIqYt6qigqQ-WjFXoW5ErerWobgm-ZoGj0g1uhF9FJ7LXlSGbTdJO53dZ58gUuDmkWu9W891h1mAD9FGAvBmENqp6iGWS6dXYPyWiRLdatQcxZAaEHKmkQlQ8S3_ViVL5krc46UA4TAqeXUQzyRzZUvPJk2Vznn_yBpTNvjv3iDqUsDoZiNmLIZk3v5ZdTRnyDgLDAB5LVcJiiRPDt0byCAuo0rivPhoAbCMHjAotb8Ds31T9rdL9HQ",  // 请求的token，在 home_page中获取
    controllerId: "", // 调用外设网关id， 如： 0000202B09D7
    // 保存开卡等交易用户信息
    userInfo: {
      // address: "广州市天河区华穗路398号冼村街公共集体户",
      // birthday: "19930417",
      // department: "广州市公安局天河分局",
      // end: "20410309",
      // from: "20210309",
      // gender: "男",
      // id: "445121199304173459",
      // name: "许卓杰",
      // nationality: "汉",

      // d_mobile_phone_number: "18814121269",
      // d_telephone_number: "020-555555",
      // d_accupation: "新一代农民工",
      // d_address: "广州市天河区华穗路398号冼村街公共集体户",
      // d_postal_code: "000000",
    },
    img_service: "https://www.xiongweixp.tech", // 备案服务器地址
    url: {
      url_token: "https://www.xiongweixp.tech/adaas/token?grant_type=client_credentials&scope=device&client_id=client_credentials&client_secret=123456",  // 免用户请求token连接
    }
  },
  deivce: {
  },

  // 定义全局方法
  call_device: function (controllerId, deviceType, method, req_body) {
    // this.getToken() //测试用
    let app = getApp()
    if (app.globalData.token == "") {
      wx.showToast({
        title: 'Token为空',
      })
    }
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
  },

  //获取token
  // getToken: function () {
  //   let app = getApp()
  //   wx.request({
  //     url: app.globalData.url.url_token,
  //     method: "POST",
  //     data: {},
  //     header: {
  //       // 'content-type': 'application/json', // 默认值
  //     },
  //     success(res) {
  //       console.log("请求token返回结果：", res)
  //       app.globalData.token = res.access_token
  //     },
  //     fail(err) {
  //       console.log("获取token失败：", err)
  //       wx.showModal({
  //         title: "获取token失败",
  //         content: JSON.stringify(err)
  //       })
  //     }
  //   })
  // },

})
