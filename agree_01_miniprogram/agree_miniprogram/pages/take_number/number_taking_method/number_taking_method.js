// pages/take_number/number_taking_method/number_taking_method.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        bt_scan_data: "",
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

    /**
     * 扫一扫调用方法：
     *  打开扫描二维码摄像头
     */
    bt_scan: function(){
        let that = this;
        console.log("function: bt_touch");
        // 允许从相机和相册扫码
        wx.scanCode({
            success (res) {
            console.log(res)
            that.data.bt_scan_data = res;
            wx.showModal({
                title: '提示',
                // content: JSON.stringify(res),
                content: res.result,
                success (res1) {
                  if (res1.confirm) {
                    console.log('用户点击确定')
                  } else if (res1.cancel) {
                    console.log('用户点击取消')
                  }
                }
              })
            }
        });
        console.log("function: bt_touch bt_scan_data :", res);
    },
    /**
     * 靠一靠调用方法：
     *  靠近NFC 读取里面controllerId
     */
    bt_touch: function(){
        console.log("function: bt_touch");
        wx.startHCE({
            aid_list: ['F222222222'],
            success (res1) {
                wx.showModal({
                    title: '提示',
                    content: JSON.stringify(res1),
                    // content: res.result,
                    success (res1) {
                      if (res1.confirm) {
                        console.log('用户点击确定')
                      } else if (res1.cancel) {
                        console.log('用户点击取消')
                      }
                    }
                  })
            },
            fail (res1) {
                wx.showModal({
                    title: '提示',
                    content: JSON.stringify(res1),
                    // content: res.result,
                    success (res1) {
                      if (res1.confirm) {
                        console.log('用户点击确定')
                      } else if (res1.cancel) {
                        console.log('用户点击取消')
                      }
                    }
                  })
            },
          })
    },

})