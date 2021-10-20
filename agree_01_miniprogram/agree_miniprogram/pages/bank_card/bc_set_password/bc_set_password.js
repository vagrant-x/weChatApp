// pages/bank_card/bc_set_password/bc_set_password.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bt_class_next: "",
    url: {
      url_scan_image: getApp().globalData.img_service + "/miniprogramImg/img_kaika/0501.png",
      url_success_image: getApp().globalData.img_service + "/miniprogramImg/img_kaika/0601.png",
    },
    isShowScanImage: true, // 是否显示进行扫描图片
    isShowSuccess: false, // 是否显示设置密码成功提示信息
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
  click_image_scan1: function () {
    let that = this;
    // 允许从相机和相册扫码
    wx.scanCode({
      success(res) {
        console.log(res)
        that.data.bt_scan_data = res;
        let controllerId = res.result //二维码内容
        getApp().globalData.controllerId = controllerId // 将id保存到golbalData 中。
        that.setData({
          isShowScanImage: false // 扫描成功，显示密码输入框
        })
        that.call_pin_twice()
      },
      fail(res) {
        wx.showModal({
          title: '扫描出错',
          content: res.errMsg,
          success(res1) {
            if (res1.confirm) {
              console.log('用户点击确定')
            } else if (res1.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      },
    });
  },
  // 调用密码键盘
  call_pin_twice: function () {
    this.call_pin("ReadOnce")
  },
  call_pin: function (method) {
    let this_page = this
    let app = getApp()
    let promise = app.call_device(app.globalData.controllerId, "pin", method, {})
    promise.then(res => {
      console.log('res: ', res)
      if (res.statusCode == 200) {
        if (res.data.status == 0) {
          let password = res.data.data.password
          console.log(method + "输入密码：", password)
          if(method == "ReadOnce"){
            let sixpass1 = this.selectComponent("#sixpass1");  //拿到密码组件
            sixpass1.setAllData("123456");  //设置密码
            this_page.call_pin("ReadTwice")
            app.globalData.userInfo["first_pw"] = password
          }else if(method == "ReadTwice"){
            let sixpass2 = this.selectComponent("#sixpass2");  //拿到密码组件
            sixpass2.setAllData("123456");  //设置密码
            app.globalData.userInfo["second_pw"] = password
            this_page.setData({
              isShowSuccess: true,
              bt_class_next: "bt-next-click",
            })
          }
        } else {
          wx.showModal({
            title: "调用密码键盘失败",
            content: res.data.msg,
          })
        }
      } else {
        wx.showModal({
          title: "调用密码键盘失败",
          content: res.errMsg,
        })
      }
    }).catch(res => {
      console.log(res)
    })
  },
  // 1.6.3以上模板组件写法
  passInput(e) {
    let sixpass1 = this.selectComponent("#sixpass1");  //拿到密码组件
    sixpass1.setAllData("123456");  //设置密码
    if (sixpass1.data.allinput.length >= 6) {
      console.log('已经完成' + sixpass1.data.allinput)
    } else {
      sixpass1.setWidthHeight({
        "width": 180,
        "height": 30
      })
      console.log('还差点 ' + sixpass1.data.allinput)
    }
  },
  next_page: function () {
    // console.log('还差点 ')
    // let sixpass1 = this.selectComponent("#sixpass1");  //拿到密码组件
    // sixpass1.setWidthHeight({
    //   "width": 180,
    //   "height":30
    // })
    // sixpass1.setBackgroundColor("red")
    if(this.data.isShowSuccess){
      wx.navigateTo({
        url: '/pages/take_number/tnm_scan_idr/tnm_scan_idr',
      })
    }else{
      wx.showToast({
        title: '请设置密码',
        icon:"error"
      })
    }
  },
})