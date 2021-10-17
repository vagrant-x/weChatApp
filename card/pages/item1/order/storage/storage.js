// pages/item1/order/order.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        number: 0,
        s_data: ""
    },
    save_storage: function () {
        let this_page = this
        wx.setStorage({
            key: "name",
            data: "我的头条" + this_page.data.number,
            success: function () {
                console.log("保存成功")
                this_page.setData({
                    number:  this_page.data.number + 1
                })
            }
        })
    },
    get_storage: function () {
        let this_page = this
        wx.getStorage({ 
            key: "name",
            success(res) {
                console.log(res.data)
                this_page.setData({
                    s_data: res.data
                })
            },
            fail: function(res){
                this_page.setData({
                    s_data: ""
                })
            }
        })
    },
    clear_storage: function(){
        wx.clearStorage({
          success: (res) => {
              console.log("清除数据")
          },
          fail: (res)=>{
            console.log(res)
          }
        })
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