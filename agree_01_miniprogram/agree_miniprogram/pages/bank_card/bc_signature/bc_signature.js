// pages/bank_card/bc_signature/bc_signature.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowSignature: true,
    context: null, // 签名记录参数
    img_url: "", // 生成图片url
    url: {
      url_kaika: getApp().globalData.img_service + "/miniprogramImg/img_kaika/1201.png",//身份证正面图示
    },
  },

  /**
    * 记录开始点
    * @param {*} options 
    */
  bindtouchstart: function (e) {
    this.data.context.moveTo(e.changedTouches[0].x, e.changedTouches[0].y);
  },
  /**
   * 记录移动点，刷新绘制
   * @param {*} e 
   */
  bindtouchmove: function (e) {
    this.data.context.lineTo(e.changedTouches[0].x, e.changedTouches[0].y);
    this.data.context.stroke();
    this.data.context.draw(true);
    this.data.context.moveTo(e.changedTouches[0].x, e.changedTouches[0].y);
  },
  clear: function () {
    this.data.context.draw();
    this.data.context.setFillStyle('#fff')
    this.data.context.fillRect(0, 0, 500, 150)
  },
  export: function () {
    let that = this;
    that.data.context.draw(true, wx.canvasToTempFilePath({
      fileType: 'jpg',
      canvasId: 'firstCanvas',
      success(res) {
        that.setData({
          img_url: res.tempFilePath,
          isShowSignature: false
        })
      },
      fail() {
        wx.showToast({
          title: '导出失败',
          icon: 'none',
          duration: 2000
        })
      }
    }))
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      "title": app.globalData.appName
    }
  },
  onShareTimeline: function (res) {
    return {
      "title": app.globalData.appName
    }
  },
  //----------------------------------------------------------------------
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
    const context = wx.createCanvasContext('firstCanvas');
    context.setFillStyle('#fff')
    context.fillRect(0, 0, 500, 150)
    this.setData({
      context
    });
    context.draw()
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
  next_page: function () {
    wx.navigateTo({
      url: '/pages/bank_card/bc_transaction_results/bc_transaction_results',
    })
  },
})