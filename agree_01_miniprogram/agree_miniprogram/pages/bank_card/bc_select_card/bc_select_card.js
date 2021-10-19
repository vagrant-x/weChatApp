// pages/bank_card/bc_select_card/bc_select_card.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        bt_class_next: "", // 按钮样式
        background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
        indicatorDots: true, //显示面板指示点
        vertical: false, //滑动方向是否为纵向
        autoplay: false, //是否自动切换
        circular: false, // 是否采用衔接滑动
        interval: 3000, // 自动切换时间间隔
        duration: 500, // 滑动动画时长
        previousMargin: 0, //前边距，可用于露出前一项的一小部分，接受 px 和 rpx 值
        nextMargin: 0 // 后边距，可用于露出后一项的一小部分，接受 px 和 rpx 值
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
    next_page: function(){
        wx.navigateTo({
          url: '/pages/bank_card/bc_set_password/bc_set_password',
        })
    }
})