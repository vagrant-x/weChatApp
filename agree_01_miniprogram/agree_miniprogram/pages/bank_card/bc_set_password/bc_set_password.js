// pages/bank_card/bc_set_password/bc_set_password.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      url:{
        url_scan_image: getApp().globalData.img_service + "/miniprogramImg/img_kaika/0501.png",
        url_success_image: getApp().globalData.img_service + "/miniprogramImg/img_kaika/0601.png",
      },
        isShowScanImage: false, // 是否显示进行扫描图片
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
    click_image_scan1: function(){
        this.setData({
            isShowScanImage: false
        })
        
    },
    // 1.6.3以上模板组件写法
  passInput(e){
    let sixpass1 = this.selectComponent("#sixpass1");  //拿到密码组件
    sixpass1.setAllData("123456");  //设置密码
    if(sixpass1.data.allinput.length>=6){
      console.log('已经完成'+sixpass1.data.allinput)
    }else{
      sixpass1.setWidthHeight({
        "width": 180,
        "height":30
      })
      console.log('还差点 '+sixpass1.data.allinput)
    }
  },
  next_page: function(){
    // console.log('还差点 ')
    // let sixpass1 = this.selectComponent("#sixpass1");  //拿到密码组件
    // sixpass1.setWidthHeight({
    //   "width": 180,
    //   "height":30
    // })
    // sixpass1.setBackgroundColor("red")
    wx.navigateTo({
      url: '/pages/take_number/tnm_scan_idr/tnm_scan_idr',
    })
  },
})