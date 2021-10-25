// pages/modal_view/modal_view.js
Page({


    data: {
        isHidden: true //隐藏模态框
    },
    showMd: function (e) {
        //弹出框展示套餐的具体商品，根据data-group得到数组对象，然后再渲染到界面上
        var self = this;
        let groupList = e.currentTarget.dataset.group;
        //debugger
        this.setData({
            isHidden: false,//显示模态框，
            groupArr: groupList,
        })
    },

    hiddenMd: function () {
        this.setData({
            isHidden: true//隐藏模态框
        })
    },

    //====================================================
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

    }
})