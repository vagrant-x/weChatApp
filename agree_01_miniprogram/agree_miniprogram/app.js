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
    token: "",  // 请求的token，在 home_page中获取
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
      // 交易：开卡预填 
      kaika_yutian_list: [ 
        "/pages/kaika_yutian/number_taking_index/number_taking_index",
        "/pages/kaika_yutian/tnm_scan_idr/tnm_scan_idr",
        "/pages/kaika_yutian/input_information/input_information",
        "/pages/kaika_yutian/bc_select_card/bc_select_card",
        "/pages/kaika_yutian/tnm_print/tnm_print",  
      ],
      // 交易：取号
      quhao_list: [
        "/pages/take_number/number_taking_index/number_taking_index",
        "/pages/take_number/tnm_scan_idr/tnm_scan_idr",
        "/pages/take_number/tnm_print/tnm_print",  
      ],
      current_trans: [], //当前进行的交易
      trans_index: 0, //交易执行步骤
    }
  },
  deivce: {
  },
  // 
  get_next_page_url: function(){
    let index = this.globalData.url.trans_index
    let trans_url = this.globalData.url.current_trans[index]
    this.globalData.url.trans_index++
    console.log("next_page_url: ", trans_url)
    return trans_url
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
      // console.log("bearer_token :", bearer_token)
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
