// pages/qrcode/qrcode.js
const W = wx.getSystemInfoSync().windowWidth;
const rate = 750.0 / W;

// 300rpx 在6s上为 150px
const qrcode_w = 300 / rate;
// var QRCode = require('../../utils/weapp.qrcode.js')
const drawQrcode = require('../../utils/weapp.qrcode.js')

Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        
        //传入wxml中二维码canvas的canvas-id
        //单位为px
        // var qrcode = new drawQrcode({
        //     // usingIn: this,
        //     text: "https://github.com/tomfriwel/weapp-qrcode",
        //     width: 200,
        //     height: 200,
        //     canvasId: 'myQrcode',
        //     colorDark: "#000000",
        //     colorLight: "#ffffff",
        //     // correctLevel: drawQrcode.CorrectLevel.L,
        // });
        drawQrcode({
            width: 200,
            height: 200,
            // x: 20,
            // y: 20,
            canvasId: 'myQrcode',
            // ctx: wx.createCanvasContext('myQrcode'),
            typeNumber: 10,
            text:"12345678",
            // image: {
            //     imageResource: '../../images/icon.png',
            //     dx: 70,
            //     dy: 70,
            //     dWidth: 60,
            //     dHeight: 60
            // },
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