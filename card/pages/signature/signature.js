// pages/signature/signature.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        context: null, // 签名记录参数
        img_url: "" // 生成图片url
    },

    /**
     * 记录开始点
     * @param {*} options 
     */
    bindtouchstart: function (e) {
        this.data.context.moveTo(e.changedTouches[0].x, e.changedTouches[0].y);
    },
    /**
     * 记录移动点，刷新绘制
     * @param {*} e 
     */
    bindtouchmove: function (e) {
        this.data.context.lineTo(e.changedTouches[0].x, e.changedTouches[0].y);
        this.data.context.stroke();
        this.data.context.draw(true);
        this.data.context.moveTo(e.changedTouches[0].x, e.changedTouches[0].y);
    },
    clear: function () {
        this.data.context.draw();
        this.data.context.setFillStyle('#fff')
        this.data.context.fillRect(0, 0, 500, 150)
    },
    export: function () {
        let that = this;
        that.data.context.draw(true, wx.canvasToTempFilePath({
            fileType: 'jpg',
            canvasId: 'firstCanvas',
            success(res) {
                that.setData({
                    img_url: res.tempFilePath
                })
                // let { tempFilePath } = res;
                // wx.uploadFile({
                //     filePath: tempFilePath,
                //     name: 'file',
                //     formData: {
                //         user: 'test',
                //         token: wx.getStorageSync('token')
                //     },
                //     url: app.globalData.joinApiWay + 'materials/insertfile',
                //     success(res) {
                //         let imgPath = JSON.parse(res.data).gather;
                //         wx.setStorageSync('sign', imgPath);
                //         wx.navigateBack({
                //             delta: 1,
                //         })
                //     }
                // })
            },
            fail() {
                wx.showToast({
                    title: '导出失败',
                    icon: 'none',
                    duration: 2000
                })
            }
        }))
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        const context = wx.createCanvasContext('firstCanvas');
        context.setFillStyle('#fff')
        context.fillRect(0, 0, 500, 150)
        this.setData({
            context
        });
        context.draw()
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        return {
            "title": app.globalData.appName
        }
    },
    onShareTimeline: function (res) {
        return {
            "title": app.globalData.appName
        }
    }
})
