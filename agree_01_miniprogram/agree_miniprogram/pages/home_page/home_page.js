// pages/home_page/home_page.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url:{
      url_homepage: getApp().globalData.img_service + "/miniprogramImg/img_homepage"
    },
    products: [{
      name: '活期理财',
      desp: '代销招赢开鑫…',
      rate: '2.90',
      details: '7日年化',
    }, {
      name: '定期理财',
      desp: '代销招赢开鑫…',
      rate: '3.10',
      details: '业绩比较基准',
    }, {
      name: '活期理财',
      desp: '代销招赢开鑫…',
      rate: '3.25',
      details: '业绩比较基准',
    }],
    list: [
      {
        // callback:this.appointmentAccountOpening,
        id: "1",
        text: "预约开户",
        // icon: "https://www.aweb.org.cn/static/ui/poc/yuyuekaihu.png",
        icon: getApp().globalData.img_service + "/miniprogramImg/img_homepage" + "/yuyuekaihu.png",
      },
      {
        id: "2",
        text: "开卡",
        // icon: "https://www.aweb.org.cn/static/ui/poc/kaika.png",
        icon: getApp().globalData.img_service + "/miniprogramImg/img_homepage" + "/kaika.png",
      },
      {
        id: "3",
        text: "转账",
        // icon: "https://www.aweb.org.cn/static/ui/poc/zhuanzhang.png",
        icon: getApp().globalData.img_service + "/miniprogramImg/img_homepage" + "/zhuanzhang.png",
      },
      {
        id: "4",
        text: "理财",
        // icon: "https://www.aweb.org.cn/static/ui/poc/zhuanzhang.png",
        icon: getApp().globalData.img_service + "/miniprogramImg/img_homepage" + "/zhuanzhang.png",
      },
      {
        id: "5",
        text: "电子回单",
        // icon: "https://www.aweb.org.cn/static/ui/poc/dianzihuidan.png",
        icon: getApp().globalData.img_service + "/miniprogramImg/img_homepage" + "/dianzihuidan.png",
      },
      {
        id: "6",
        text: "缴费",
        // icon: "https://www.aweb.org.cn/static/ui/poc/jiaofei.png",
        icon: getApp().globalData.img_service + "/miniprogramImg/img_homepage" + "/jiaofei.png",
      },
      {
        id: "7",
        text: "贷款",
        // icon: "https://www.aweb.org.cn/static/ui/poc/daikuan.png",
        icon: getApp().globalData.img_service + "/miniprogramImg/img_homepage" + "/daikuan.png",
      },
      {
        id: "8",
        text: "全部",
        // icon: "https://www.aweb.org.cn/static/ui/poc/quanbu.png",
        icon: getApp().globalData.img_service + "/miniprogramImg/img_homepage" + "/quanbu.png",
      },
    ],
    info: [
      {
        // url: "https://www.aweb.org.cn/static/ui/poc/banner.png",
        url: getApp().globalData.img_service + "/miniprogramImg/img_homepage" + "/bannner.png",
      },
      {
        // url: "https://www.aweb.org.cn/static/ui/poc/banner.png",
        url: getApp().globalData.img_service + "/miniprogramImg/img_homepage" + "/bannner.png",
      },
      {
        // url: "https://www.aweb.org.cn/static/ui/poc/banner.png",
        url: getApp().globalData.img_service + "/miniprogramImg/img_homepage" + "/bannner.png",
      },
    ],
    current: 0,
    autoplay: true,
    dotStyle: {
      width: 10,
      bottom: 4,
      backgroundColor: "rgba(12, 57, 147, 0.2)",
      border: "1px rgba(12, 57, 147, 0.2) solid",
      selectedBackgroundColor: "#407FFF",
      selectedBorder: "#407FFF",
    },
  },
  // 点击取号按钮事件
  bt_take_number: function () {
    wx.navigateTo({
      url: '/pages/take_number/number_taking_index/number_taking_index',
    })
  },
  view_open_transaction: function(event){
    console.log("点击打开交易：",event)
    // 开卡交易 id 在data设置为2
    console.log("id:", event.currentTarget.dataset.id)
    if(event.currentTarget.dataset.id == "2"){
      wx.navigateTo({
        url: '/pages/bank_card/bc_index/bc_index',
      })
    }else{
      wx.showToast({
        title: '未开通该服务',
        icon: "error"
      })
    }
  },
  appointmentAccountOpening(item) {
    uni.navigateTo({
      url: '../appointmentAccountOpening/example',
      fail: (res) => {
        console.log(res);
      },
    })
  },
  gridChange(e) {
    let { detail } = e;
    // console.log(e);
    let index = detail && detail.index;
    // console.log(index)
    let item = this.list[index];
    // console.log(item)
    // console.log(item.callback)
    item && item.callback && item.callback(item)
  },
  change(e) {
    this.current = e.detail.current;
  },

  // 请求token
  getToken: function () {
    let this_page = this
    wx.request({
      url: 'https://www.xiongweixp.tech/adaas/token?username=admin&password=admin&grant_type=password&scope=device&client_id=client_password&client_secret=123456', //仅为示例，并非真实的接口地址
      method: "POST",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res)
        let app = getApp()
        app.globalData.token = res.data.access_token
        this_page.data.token = res.data.access_token
        console.log("取号 token : ", app.globalData.token)
      }
    })
  },
  // ----------------------------------------------------------------------------------------
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