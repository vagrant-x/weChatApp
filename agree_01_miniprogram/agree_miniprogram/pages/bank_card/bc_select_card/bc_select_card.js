// pages/bank_card/bc_select_card/bc_select_card.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        bt_class_next: "bt-next-click", // 按钮样式
        cardList: ['赞同银行普通借记卡-1', '赞同银行普通借记卡-2', '赞同银行普通借记卡-3'],
        selectCard: "赞同银行普通借记卡-1",
        indicatorDots: true, //显示面板指示点
        vertical: false, //滑动方向是否为纵向
        autoplay: false, //是否自动切换
        circular: false, // 是否采用衔接滑动
        interval: 3000, // 自动切换时间间隔
        duration: 500, // 滑动动画时长
        previousMargin: 0, //前边距，可用于露出前一项的一小部分，接受 px 和 rpx 值
        nextMargin: 0, // 后边距，可用于露出后一项的一小部分，接受 px 和 rpx 值

        url: {
            url_card: app.globalData.img_service + "/miniprogramImg/img_kaika"
        },
        detailList: [
            { id: 1, text: "支持银联", style: "height: 40rpx;width: 58rpx;" },
            { id: 2, text: "一卡多户", style: "height: 40rpx;width: 58rpx;" },
            { id: 3, text: "通存通兑", style: "height: 49rpx;width: 50rpx;" },
            { id: 4, text: "投资理财", style: "height: 48rpx;width: 42rpx;" },
            { id: 5, text: "网上银行", style: "height: 56rpx;width: 56rpx;" },
            { id: 6, text: "手机银行", style: "height: 58rpx;width: 40rpx;" },
            { id: 7, text: "短信服务", style: "height: 40rpx;width: 56rpx;" },
            { id: 8, text: "交易限额", style: "height: 50rpx;width: 50rpx;" },
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
    swiperChange: function(event){
        console.log(event)
        let cardName = this.data.cardList[event.detail.current]
        this.setData({
            selectCard: cardName
        })
        console.log("选择：", cardName)
    },
    next_page: function () {
        app.globalData.userInfo["cardName"] = this.data.selectCard
        console.log("跳出选择卡种页面, userInfo = ", app.globalData.userInfo)
        wx.navigateTo({
            url: '/pages/bank_card/bc_set_password/bc_set_password',
        })
    }
})