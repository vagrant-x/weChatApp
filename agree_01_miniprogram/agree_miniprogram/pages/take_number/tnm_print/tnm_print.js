// pages/take_number/tnm_print/tnm_print.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        controllerId: "",  //网关id
        token: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsiYWRhYXMiXSwidXNlcl9uYW1lIjoiYWRtaW4iLCJzY29wZSI6WyJkZXZpY2UiXSwiZXhwIjoxNjM0MTM2MjYxLCJhdXRob3JpdGllcyI6WyJzdXBlcl9tYW5hZ2VyIl0sImp0aSI6IjNiOTBhNGZlLWU4OGUtNDU4Yy04OTZiLTY5ZTNjYjE1ZTVlOSIsImNsaWVudF9pZCI6ImNsaWVudF9wYXNzd29yZCJ9.ZlX9cpfqCrm-kVyou4QEdUe-9Q2YGIkOeQ-bVNhKnZ8mUi1hAJ5XxElBYpYSZONmXXyx2L8pDVpOJwqqaMWRfRAOStOFrTTP34rofSJONrsE8KW207hbx5gGn_ujbnKAiox55esnly-loKwCLshiy0Tupz8Xk1Ms49rUl_K9WlbgoqmZRoQLdS7ZLwc-FJe_S45_PXL2T7VGzIq8Z7SQyb-W3DZzX4FY9A7n0gyIqqcs3hjyIrOAHz-_yqHmO0cR-et3cvmPQW-qI8omaVFJxLBlsz5q6Hu8iLhA5wbO73Ifl7DvbJm7v3h2ltFU4DgIU8rAGJ91xr5SnpaN9aO7vA",
    },

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
    /**
     * 调用票据打印机
     */
    call_escposprinter1: function(){
        console.log("调用票据打印机")
        let that = this
        let bearer_token = 'Bearer ' + this.data.token
        console.log("bearer_token :", bearer_token)
        wx.request({
            url: 'https://www.xiongweixp.tech/adaas/service',
            method: "POST",
            data: {
                "header": {
                    "namespace": "ADaaS.Post",
                    "resource": "Controller",
                    "name": "TestDevice",
                    "version": "1"
                },
                "payload": {
                    "controllerId": "0000202B09D7",
                    "deviceId": "DC2DED07",
                    "category": "escposprinter"
                }
            },
            header: {
                'content-type': 'application/json', // 默认值
                'Authorization': bearer_token, //token
            },
            success(res) {
                console.log(res)
            },
            fail(res) {
                console.log(res)
            },
        })
    },
})