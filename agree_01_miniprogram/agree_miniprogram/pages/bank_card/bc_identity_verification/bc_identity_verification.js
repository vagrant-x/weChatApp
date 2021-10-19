// pages/bank_card/bc_identity_verification/bc_identity_verification.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isShowTakePhoto: false,
        url: {
            url_camera: getApp().globalData.img_service + "/miniprogramImg/img_kaika/0902.png",//相机图示图片
            url_people:  getApp().globalData.img_service + "/miniprogramImg/img_kaika/0901.png", //上半身图片
            url_people_real:  getApp().globalData.img_service + "/miniprogramImg/img_kaika/1001.png", //上半身图片
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

    click_image_take_photo: function(){
        this.setData({
            isShowTakePhoto: false
        })
    },
    next_page: function(){
        wx.redirectTo({
          url: '/pages/bank_card/bc_check_info/bc_check_info',
        })
    },
})