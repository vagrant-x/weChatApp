// pages/test2/test2.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        msg: "国庆6号",
        msg2: "<b class='bStyle'>国庆7号</b><p style='color:green'>111111111</p>",
        req_data: [],
    },
    getData: function(){
        let thisData = this;
        wx.request({
          url: 'http://10.8.6.119:8081/print/getPrintFileInfo?jobNumber=A1111',
          success(res){
              console.log("获取的请求数据为：", res);
              thisData.setData({
                  req_data: res.data.msg,
              });
          }
        })
    },
    nav: function(){
        wx.navigateTo({
          url: '/pages/test/test?id=5673&name=xxx',
        })
    },

    showAlert: function(e){

        // wx.showToast({
        //   title: '第一个弹窗',
        //   icon: 'success',
        //   duration: 2000,
        // })

        // wx.showLoading({
        //   title: 'title',
        // //   duration:2000 
        // })

        // setTimeout(function(){
        //     wx.hideLoading({
        //       success: (res) => {},
        //     })
        // }, 2000)

        wx.showModal({
          cancelColor: 'cancelColor',
          title: '提示',
          content: '这是一个模式弹窗',
          success(res){
            if(res.confirm == true){
                console.log("确定")
            }else{
                console.log("取消")
            }
          },
        })
    },
    getUserInfo1: function(e){
        console.log("获取用户信息：", e)
    },
    getphonenumber1: function(e){
        console.log("获取用户手机号：",e)
    },
    changeMe: function(){
        console.log("输入了内容");
    },
    clickMe: function(event){
        console.log("点击了我:", event);
        console.log(event.currentTarget.dataset);
        this.setData({
            msg: this.data.msg + "快结束了"
        });
    },
    contact1: function(){

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

    }
})