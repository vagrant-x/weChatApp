// pages/bank_card/bc_index/bc_index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        url: {
            url_idCard_zm: "../../../resource/img/bank_card/u51.png", //身份证正面图示图片
            url_idCard_fm: "../../../resource/img/bank_card/u52.png", //身份证反面图示图片
            url_idCard_zm_tmp: "../../../resource/img/bank_card/u51.png", //身份证正面图示图片
            url_idCard_fm_tmp: "../../../resource/img/bank_card/u52.png", //身份证反面图示图片
        },
        show_zm_delete_image: false,
        show_fm_delete_image: false,
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
    //点击拍摄身份证正反面 people:人， nationalEmblem:国徽
    click_image: function (event) {
        let this_page = this
        console.log("event:", event)
        let type = event.currentTarget.dataset.imgType

        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success(res) {
                // tempFilePath可以作为img标签的src属性显示图片
                const tempFilePaths = res.tempFilePaths
                console.log("tempFilePaths: ", tempFilePaths)
                // 根据点击的图片设置对应保存的url
                if(type == "people"){
                    this_page.data.url.url_idCard_zm_tmp = tempFilePaths[0]
                    this_page.setData({
                        url: this_page.data.url,
                        show_zm_delete_image: true
                    })
                }else{
                    this_page.data.url.url_idCard_fm_tmp = tempFilePaths[0]
                    this_page.setData({
                        url: this_page.data.url,
                        show_fm_delete_image: true
                    })
                }
            }
        })
    },
    //点击删除身份证反面
    click_delete_image: function(event){
        let this_page = this
        console.log("event:", event)
        let type = event.currentTarget.dataset.imgType
        if(type == "people"){
            this_page.data.url.url_idCard_zm_tmp = this_page.data.url.url_idCard_zm
            this_page.setData({
                url: this_page.data.url,
                show_zm_delete_image: false
            })
        }else{
            this_page.data.url.url_idCard_fm_tmp = this_page.data.url.url_idCard_fm
            this_page.setData({
                url: this_page.data.url,
                show_fm_delete_image: false
            })
        }
    },
    next_page: function(){
        wx.redirectTo({
          url: '/pages/bank_card/input_information/input_information',
        })
    },
})