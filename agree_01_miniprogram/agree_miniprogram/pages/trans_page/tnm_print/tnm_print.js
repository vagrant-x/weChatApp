// pages/kaika_yutian/tnm_print/tnm_print.js
const util = require("../../../utils/util.js")
const drawQrcode = require('../../../utils/weapp.qrcode.js')
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        trans_name: "转账汇款"
    },

    call_escposprinter1: function () {
        console.log("准备打印取号信息")
        // call_device: function (controllerId, deviceType, method, req_body)
        let this_page = this
        let bearer_token = 'Bearer ' + app.globalData.token
        console.log("bearer_token :", bearer_token)
        let myDate = util.formatCurrentDateTime()
       
        let print_data = {
            "printData": [
                { "hw": { "hw": "init" } },
                { "ln": { "count": "2" } },
                { "set": { "align": "center", "bold": "True", "double_width": "True", "double_height": "True" } },
                { "text": { "txt": "排队号" } },
                { "ln": { "count": "2" } },
                { "text": { "txt": "V0001" } },
                { "ln": { "count": "2" } },
                { "set": { "align": "center", "bold": "", "double_width": "", "double_height": "" } },
                { "text": { "txt": "业务ID：BS1132" } },
                { "ln": { "count": "1" } },
                { "text": { "txt": "业务名称：" + this_page.data.trans_name } },
                { "ln": { "count": "1" } },
                { "text": { "txt": "可办理窗口：1、2、3、4" } },
                { "ln": { "count": "1" } },
                { "text": { "txt": "等待人数：1" } },
                { "ln": { "count": "1" } },
                { "text": { "txt": "网点总等待人数：1" } },
                { "ln": { "count": "1" } },
                { "text": { "txt": "队列校验码：777" } },
                { "ln": { "count": "1" } },
                // { "qr": { "content": app.globalData.controllerId } },
                { "qr": { "content": "V0001" } },
                { "ln": { "count": "1" } },
                { "text": { "txt": "取号时间：" + myDate } },
                { "ln": { "count": "6" } }
            ]
        }
        // call_device: function (controllerId, deviceType, method, req_body)
        wx.showLoading({
            title: "打印中...",
            mask: true
        })
        let promise = app.call_device(app.globalData.controllerId, "escposprinter", "Print", print_data)
        promise.then(res => {
            wx.hideLoading({})
            console.log("调用外设success：", res)
            if (res.statusCode == 200 && res.data.status == 0) {
                wx.showModal({
                    title: "打印成功",
                    content: "返回首页",
                    success(res) {
                        if (res.confirm) {
                            app.globalData.url.trans_index = 0 //初始化交易url读取下标
                            
                            // let pages = getCurrentPages().length - 1;
                            // wx.navigateBack({ // 返回首页
                            //     delta: pages
                            // })
                            wx.reLaunch({
                                url: '/pages/home_page/home_page'
                              })
                            // wx.redirectTo({
                            //   url: '/pages/home_page/home_page',
                            // })
                        }
                    }
                })
            } else {
                wx.showModal({
                    title: "打印失败",
                    content: JSON.stringify(res.data)
                })
            }
        }).catch(res => {
            wx.hideLoading({})
            wx.showModal({
                title: "打印失败",
                content: res.errMsg,
            })
        })
    },

    /**
     * 调用票据打印机
     */
    // call_escposprinter1: function () {
    //     console.log("调用票据打印机")
    //     let that = this
    //     let bearer_token = 'Bearer ' + this.data.token
    //     console.log("bearer_token :", bearer_token)
    //     wx.request({
    //         url: 'https://www.xiongweixp.tech/adaas/service',
    //         method: "POST",
    //         data: {
    //             "header": {
    //                 "namespace": "ADaaS.Post",
    //                 "resource": "Controller",
    //                 "name": "TestDevice",
    //                 "version": "1"
    //             },
    //             "payload": {
    //                 "controllerId": "0000202B09D7",
    //                 "deviceId": "DC2DED07",
    //                 "category": "escposprinter"
    //             }
    //         },
    //         header: {
    //             'content-type': 'application/json', // 默认值
    //             'Authorization': bearer_token, //token
    //         },
    //         success(res) {
    //             console.log(res)
    //         },
    //         fail(res) {
    //             console.log(res)
    //         },
    //     })
    // },

    // call_escposprinter_test: function () {
    //     console.log("调用票据打印机")
    //     let that = this
    //     let bearer_token = 'Bearer ' + this.data.token
    //     console.log("bearer_token :", bearer_token)
    //     wx.request({
    //         url: 'https://www.xiongweixp.tech/adaas/service',
    //         method: "POST",
    //         data: {
    //             "header": {
    //                 "namespace": "ADaaS.Post",
    //                 "resource": "Controller",
    //                 "name": "TestDevice",
    //                 "version": "1"
    //             },
    //             "payload": {
    //                 "controllerId": "0000202B09D7",
    //                 "deviceId": "DC2DED07",
    //                 "category": "escposprinter"
    //             }
    //         },
    //         header: {
    //             'content-type': 'application/json', // 默认值
    //             'Authorization': bearer_token, //token
    //         },
    //         success(res) {
    //             console.log(res)
    //         },
    //         fail(res) {
    //             console.log(res)
    //         },
    //     })
    // },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
    //   // 调用weapp.qrcode.js 生成二维码
    //   let bee_img = "../../../resource/img/0001.png"
    //   drawQrcode({
    //       width: 150,
    //       height: 150,
    //       // x: 20,
    //       // y: 20,
    //       canvasId: 'myQrcode',
    //       // ctx: wx.createCanvasContext('myQrcode'),
    //       typeNumber: 10,
    //       text: app.globalData.controllerId,
    //     //   image: {
    //     //       imageResource: bee_img,
    //     //       dx: 30,
    //     //       dy: 30,
    //     //       dWidth: 30,
    //     //       dHeight: 30
    //     //   },
    //       callback(e) {
    //           console.log('e: ', e)
    //       }
    //   })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        console.log( app.globalData.url.current_trans_name == "kaika_yutian" ? "开卡预填": "转账汇款")
        this.setData({
            trans_name: app.globalData.url.current_trans_name == "kaika_yutian" ? "开卡预填": "转账汇款"
        })
      // 调用weapp.qrcode.js 生成二维码
      let bee_img = "../../../resource/img/0001.png"
      drawQrcode({
          width: 150,
          height: 150,
          // x: 20,
          // y: 20,
          canvasId: 'myQrcode',
          // ctx: wx.createCanvasContext('myQrcode'),
          typeNumber: 10,
          text: app.globalData.controllerId,
        //   image: {
        //       imageResource: bee_img,
        //       dx: 30,
        //       dy: 30,
        //       dWidth: 30,
        //       dHeight: 30
        //   },
          callback(e) {
              console.log('e: ', e)
          }
      })
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
})