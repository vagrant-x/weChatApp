// pages/kaika_yutian/tnm_scan_idr/tnm_scan_idr.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        controllerId: "",  //网关id
        transName: "", //交易名称
        readingIdCadr: true,
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
        url: {
            url_scan_image: getApp().globalData.img_service + "/miniprogramImg/img_kaika/0701.png",
            url_people_image: getApp().globalData.img_service + "/miniprogramImg/img_kaika/0801.png",
        },
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options)
        console.log("111111111111", options.transName)
        this.setData({
            transName: options.transName
        })
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
        let this_page = this
        let bearer_token = 'Bearer ' + app.globalData.token
        // console.log("bearer_token :", bearer_token)
        // call_device: function (controllerId, deviceType, method, req_body)
        let promise = app.call_device(app.globalData.controllerId, "idr", "ReadIdentityCard", {})
        promise.then(res => {
            console.log("调用外设success：", res)
            if (res.statusCode == 200 && res.data.status == 0) {
                this_page.sava_userInfo(res.data.data)  //保存用户信息到 data
                // 显示用户信息
            } else {
                wx.showModal({
                    title: "调用身份证出错",
                    content: res.data
                })
            }
        }).catch(res => {
            wx.showModal({
                title: "调用身份证设备失败",
                content: res.errMsg,
            })
        })

        // let that = this
        // wx.request({
        //     url: 'https://www.xiongweixp.tech/adaas/service',
        //     method: "POST",
        //     data: {
        //         "header": {
        //             "namespace": "ADaaS.Post",
        //             "resource": "Controller",
        //             "name": "TestDevice", 
        //             "version": "1"
        //         },
        //         "payload": {
        //             "controllerId": "0000202B09D7",
        //             "deviceId": "514B2AFA",
        //             "category": "idr"
        //         }
        //     },
        //     header: {
        //         'content-type': 'application/json', // 默认值
        //         'Authorization': bearer_token, //token
        //     },
        //     success(res) {
        //         console.log(res)
        //         if (res.statusCode == 200 && res.data.status == 0) {
        //             that.sava_userInfo(res.data.data)  //保存用户信息到 data
        //             // 显示用户信息
        //         }
        //     },
        //     fail(res) {
        //         console.log(res)
        //     },
        // })
    },
    sava_userInfo: function (data) {
        console.log("sava_userInfo -> data: ", data)
        let new_userInfo = app.globalData.userInfo // 获取全局的userInfo对象
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
        console.log("更新后userInfo:", app.globalData.userInfo)
    },
    re_call_idr: function () {
        console.log("点击重新读取按钮")
        this.setData({
            readingIdCadr: true
        })
        this.call_idr()
    },
    show_number_taking_page: function () {
        let next_page_url = app.get_next_page_url()
        // let page_url = "/pages/kaika_yutian/input_information/input_information"
        wx.navigateTo({
            url: next_page_url,
            success(res) {
                console.log(`跳转到 ${next_page_url} 成功`)
            },
        })
    },
})