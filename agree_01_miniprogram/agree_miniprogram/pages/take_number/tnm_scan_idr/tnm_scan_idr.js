// pages/take_number/tnm_scan_idr/tnm_scan_idr.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        controllerId: "",  //网关id
        readingIdCadr: true,
        token: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsiYWRhYXMiXSwidXNlcl9uYW1lIjoiYWRtaW4iLCJzY29wZSI6WyJkZXZpY2UiXSwiZXhwIjoxNjM0MTM2MjYxLCJhdXRob3JpdGllcyI6WyJzdXBlcl9tYW5hZ2VyIl0sImp0aSI6IjNiOTBhNGZlLWU4OGUtNDU4Yy04OTZiLTY5ZTNjYjE1ZTVlOSIsImNsaWVudF9pZCI6ImNsaWVudF9wYXNzd29yZCJ9.ZlX9cpfqCrm-kVyou4QEdUe-9Q2YGIkOeQ-bVNhKnZ8mUi1hAJ5XxElBYpYSZONmXXyx2L8pDVpOJwqqaMWRfRAOStOFrTTP34rofSJONrsE8KW207hbx5gGn_ujbnKAiox55esnly-loKwCLshiy0Tupz8Xk1Ms49rUl_K9WlbgoqmZRoQLdS7ZLwc-FJe_S45_PXL2T7VGzIq8Z7SQyb-W3DZzX4FY9A7n0gyIqqcs3hjyIrOAHz-_yqHmO0cR-et3cvmPQW-qI8omaVFJxLBlsz5q6Hu8iLhA5wbO73Ifl7DvbJm7v3h2ltFU4DgIU8rAGJ91xr5SnpaN9aO7vA",
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
        },
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // this.data.controllerId = options.controllerId //保存网关ID
        // let app = getApp()
        // this.data.token =  app.globalData.token  //设置获取的token到本页面
        console.log(`controllerId = ${this.data.controllerId}`)
        this.call_idr()  //调用身份证模块
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

    //call idr： 调用身份证
    call_idr: function () {
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
                    "deviceId": "514B2AFA",
                    "category": "idr"
                }
            },
            header: {
                'content-type': 'application/json', // 默认值
                'Authorization': bearer_token, //token
            },
            success(res) {
                console.log(res)
                if (res.statusCode == 200 && res.data.status == 0) {
                    that.sava_userInfo(res.data.data)  //保存用户信息到 data
                    // 显示用户信息
                }
            },
            fail(res) {
                console.log(res)
            },
        })
    },
    sava_userInfo: function (data) {
        console.log("sava_userInfo -> data: ", data)
        let new_userInfo = {}
        new_userInfo["address"] = data.address
        new_userInfo["birthday"] = data.birthday
        new_userInfo["department"] = data.department
        new_userInfo["end"] = data.end
        new_userInfo["from"] = data.from
        new_userInfo["gender"] = data.gender
        new_userInfo["id"] = data.id
        new_userInfo["name"] = data.name
        new_userInfo["nationality"] = data.nationality
        console.log("userInfo :", new_userInfo)
        this.setData({
            userInfo: new_userInfo,
            readingIdCadr: false
        })  //隐藏刷身份证提示，显示身份证信息
    },
    re_call_idr: function () {
        console.log("点击重新读取按钮")
        this.setData({
            readingIdCadr: true
        })
        this.call_idr()
    },
    show_number_taking_page: function(){
        let page_url = "/pages/take_number/tnm_print/tnm_print"
        wx.redirectTo({
          url: page_url,
          success(res){
            console.log(`跳转到 ${page_url} 成功`)
          },
        })
    },
})