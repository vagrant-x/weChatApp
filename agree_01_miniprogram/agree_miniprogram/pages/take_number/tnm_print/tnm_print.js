// pages/take_number/tnm_print/tnm_print.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        controllerId: "",  //网关id
        token: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsiYWRhYXMiXSwidXNlcl9uYW1lIjoiYWRtaW4iLCJzY29wZSI6WyJkZXZpY2UiXSwiZXhwIjoxNjM0MjIxODgwLCJhdXRob3JpdGllcyI6WyJzdXBlcl9tYW5hZ2VyIl0sImp0aSI6ImE0ZDcyM2I0LTkzZTQtNDk5Yi1iNTIyLWRlMDM4NDg2OTBhNiIsImNsaWVudF9pZCI6ImNsaWVudF9wYXNzd29yZCJ9.Q0FfanIsuqtp6TYgWkeRgiFvmXVYS_AIFFHFRTOG1BHCQcrcZrQzfLMrSYBnXDgaujpqhUjJm0R8jYjJHmklQGJj0VTkx2b8Rw9v-irMWwuA3iWZP86CzxxsLg610aF6svEEbshuPWjpg-s8iF9NX8oukkHVRNN3lbyoT71TrHZ10JNAsjmu8fs1vCGnmPWmzspTtISV1F6zvC3Vryi-HZaRvyGfxKCHoGf0qcX3aHctAXPta9Djm1DgoD2Zw-bZ6drqqKv_PCf2qu5AxyrY3lRGqigpeLZ7kQd4eUQPy3HrxCKBg4L1pZR2MJ-_dU41zUA3GKMyh9-NmaqbBx6fdA",
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
            {"text":{"txt": "业务名称：转账汇款"}}, 
            {"ln": {"count": "1"}}, 
            {"text":{"txt": "可办理窗口：1、2、3、4"}}, 
            {"ln": {"count": "1"}}, 
            {"text":{"txt": "等待人数：0"}}, 
            {"ln": {"count": "1"}}, 
            {"text":{"txt": "网点总等待人数：0"}}, 
            {"ln": {"count": "1"}}, 
            {"text":{"txt": "队列校验码：668"}}, 
            {"ln": {"count": "1"}}, 
            {"text":{"txt": "取号时间：2020-09-21 10:30:24"}}, 
            {"ln": {"count": "6"}}
        ]
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
    call_escposprinter_test: function(){
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