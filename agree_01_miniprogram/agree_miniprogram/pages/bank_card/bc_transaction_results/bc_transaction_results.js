// pages/bank_card/bc_transaction_results/bc_transaction_results.js
const app = getApp()
var util = require("../../../utils/util.js")
const drawQrcode = require('../../../utils/weapp.qrcode.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        url: {
            url_kaika: getApp().globalData.img_service + "/miniprogramImg/img_kaika",
          },
    },
    printInfo: function(){
        console.log("准备打印取卡信息")
        // call_device: function (controllerId, deviceType, method, req_body)
        let this_page = this
        let bearer_token = 'Bearer ' + app.globalData.token
        console.log("bearer_token :", bearer_token)
        let myDate = util.formatCurrentDateTime()
        let print_data = {
            "printData": [
                {"hw": {"hw": "init"}}, 
                {"ln": {"count": "2"}}, 
                {"set":{"align":"center", "bold":"True", "double_width": "True", "double_height":"True"}}, 
                {"text":{"txt": "排队号"}}, 
                {"ln": {"count": "2"}}, 
                {"text":{"txt": "V0001"}}, 
                {"ln": {"count": "2"}}, 
                {"set":{"align":"center", "bold":"", "double_width": "", "double_height":""}}, 
                {"text":{"txt": "业务ID：BS1132"}}, 
                {"ln": {"count": "1"}}, 
                {"text":{"txt": "业务名称：开卡"}}, 
                {"ln": {"count": "1"}}, 
                {"text":{"txt": "可办理窗口：1、2、3、4"}}, 
                {"ln": {"count": "1"}}, 
                {"text":{"txt": "等待人数：1"}}, 
                {"ln": {"count": "1"}}, 
                {"text":{"txt": "网点总等待人数：1"}}, 
                {"ln": {"count": "1"}}, 
                {"text":{"txt": "队列校验码：668"}}, 
                {"ln": {"count": "1"}}, 
                {"text":{"txt": "取号时间：" + myDate}}, 
                {"ln": {"count": "6"}}
            ]
        }
        // call_device: function (controllerId, deviceType, method, req_body)
        let promise = app.call_device(app.globalData.controllerId, "escposprinter", "Print", print_data)
        promise.then(res => {
            console.log("调用外设success：", res)
            if (res.statusCode == 200 && res.data.status == 0) {
                wx.showModal({
                    title: "打印成功",
                    content: ""
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
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 调用weapp.qrcode.js 生成二维码
        let bee_img = "../../../resource/img/0001.png"
        drawQrcode({
            width: 160,
            height: 160,
            // x: 20,
            // y: 20,
            canvasId: 'myQrcode',
            // ctx: wx.createCanvasContext('myQrcode'),
            typeNumber: 10,
            text: app.globalData.controllerId,
            image: {
                imageResource: bee_img,
                dx: 60,
                dy: 60,
                dWidth: 40,
                dHeight: 40
            },
            callback(e) {
                console.log('e: ', e)
            }
        })
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

    }
})