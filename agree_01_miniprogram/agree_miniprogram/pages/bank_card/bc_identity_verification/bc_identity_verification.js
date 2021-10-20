// pages/bank_card/bc_identity_verification/bc_identity_verification.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        bt_class_next: "",
        isShowTakePhoto: true,
        url: {
            url_camera: getApp().globalData.img_service + "/miniprogramImg/img_kaika/0902.png",//相机图示图片
            url_people: getApp().globalData.img_service + "/miniprogramImg/img_kaika/0901.png", //上半身图片
            url_people_real: getApp().globalData.img_service + "/miniprogramImg/img_kaika/1001.png", //上半身图片
            url_success_image: getApp().globalData.img_service + "/miniprogramImg/img_kaika/0601.png",
        },
        isShowSuccess: true, // 是否显示设置密码成功提示信息
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

    click_image_take_photo: function (event) {

        let this_page = this
        console.log("event:", event)
        // 选择拍照或是图片
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success(res) {
                // tempFilePath可以作为img标签的src属性显示图片
                const tempFilePaths = res.tempFilePaths
                console.log("tempFilePaths: ", tempFilePaths)
                // 根据点击的图片设置对应保存的url
                // this_page.data.url.url_people_real = tempFilePaths[0]
                //下一步按钮可用
                this_page.data.url.url_people_real = tempFilePaths[0]
                this_page.setData({
                    url:this_page.data.url,
                    isShowTakePhoto: false,
                    bt_class_next: "bt-next-click"
                })
            }
        })
    },
    next_page: function () {
        if(!this.data.isShowTakePhoto){
            wx.redirectTo({
                url: '/pages/bank_card/bc_check_info/bc_check_info',
            })
        }else{
            wx.showToast({
              title: '请拍摄图片',
            })
        }
    },
})