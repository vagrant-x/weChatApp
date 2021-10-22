// pages/take_number/tnm_print/tnm_print.js
const util = require("../../../utils/util.js")
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
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
                { "text": { "txt": "业务名称：转账汇款" } },
                { "ln": { "count": "1" } },
                { "text": { "txt": "可办理窗口：1、2、3、4" } },
                { "ln": { "count": "1" } },
                { "text": { "txt": "等待人数：1" } },
                { "ln": { "count": "1" } },
                { "text": { "txt": "网点总等待人数：1" } },
                { "ln": { "count": "1" } },
                { "text": { "txt": "队列校验码：668" } },
                { "ln": { "count": "1" } },
                { "text": { "txt": "取号时间：" + myDate } },
                { "ln": { "count": "6" } }
            ]
        }
        // call_device: function (controllerId, deviceType, method, req_body)
        let promise = app.call_device(app.globalData.controllerId, "escposprinter", "Print", print_data)
        promise.then(res => {
            console.log("调用外设success：", res)
            if (res.statusCode == 200 && res.data.status == 0) {
                wx.showModal({
                    title: "打印成功",
                    content: "返回首页",
                    success(res) {
                        if (res.confirm) {
                            let pages = getCurrentPages().length - 1;
                            wx.navigateBack({ // 返回首页
                                delta: pages
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
                    content: res.data
                })
            }
        }).catch(res => {
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