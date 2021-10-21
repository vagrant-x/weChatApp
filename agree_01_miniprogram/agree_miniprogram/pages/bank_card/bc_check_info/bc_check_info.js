// pages/bank_card/bc_check_info/bc_check_info.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
      userInfo: {}, // 用户信息
      url: {
        url_kaika: getApp().globalData.img_service + "/miniprogramImg/img_kaika/1101.png",//身份证正面图示
      },
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      this.setData({
        userInfo: app.globalData.userInfo
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

    },
    next_page: function(){
        wx.navigateTo({
          url: '/pages/bank_card/bc_signature/bc_signature',
        })
    },
})