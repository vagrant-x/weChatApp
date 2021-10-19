// pages/bank_card/input_information/input_information.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    d_mobile_phone_number: "",
    d_telephone_number: "",
    d_address: "",
    d_postal_code: "", //邮政编码
    d_accupation: "",
    bt_class_next: "",
    array: ['其他', '工程师', '公务员', '农民', '老师'],
    index: 0,
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
  // 获取input输入的数据，绑定到data
  bindKeyInput: function (e) {
    let key = e.currentTarget.dataset.name //inpu对应的name,为绑定的数据
    let obj = {}
    obj[key] = e.detail.value
    this.setData(obj)

    if (this.data.d_mobile_phone_number && this.data.d_telephone_number &&
      this.data.d_address && this.data.d_postal_code) {
      this.setData({
        bt_class_next: "bt-next-click",
      })
    } else {
      this.setData({
        bt_class_next: "",
      })
    }
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  next_page: function () {
    if (this.data.d_mobile_phone_number && this.data.d_telephone_number &&
      this.data.d_address && this.data.d_postal_code) {
      // 保存页面输入数据
      let app = getApp()
      let userInfo = app.globalData.userInfo
      userInfo["d_mobile_phone_number"] = this.data.d_mobile_phone_number
      userInfo["d_telephone_number"] = this.data.d_telephone_number
      userInfo["d_address"] = this.data.d_address
      userInfo["d_postal_code"] = this.data.d_postal_code
      userInfo["d_accupation"] = this.data.array[ this.data.index]
      console.log("app.userInfo:", app.globalData.userInfo)
      // 跳转到下一页
      wx.navigateTo({
        url: '/pages/bank_card/bc_select_card/bc_select_card',
      })
    } else {
      wx.showToast({
        title: '信息录入不完整！',
        icon: 'error',
        duration: 2000
      })
    }
  },
})