// pages/item1/home/homeContent/homeDetail/homeDetail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imageArr:[
            "../../../../../img/cover.png",
            "../../../../../img/cover.png"
        ],
        BTarr: [
            {"size": 34,  "id":"34",  "color": "#EFEFEF"},
            {"size": 35,  "id":"35",  "color": "#EFEFEF"},
            {"size": 36,  "id":"36",  "color": "#EFEFEF"},
            {"size": 37,  "id":"37",  "color": "#EFEFEF"},
            {"size": 38,  "id":"38",  "color": "#EFEFEF"},
            {"size": 39,  "id":"39",  "color": "#1AABAB"},
            {"size": 40,  "id":"40",  "color": "#EFEFEF"},
            {"size": 41,  "id":"41",  "color": "#EFEFEF"},
            {"size": 42,  "id":"42",  "color": "#EFEFEF"},
            {"size": 43,  "id":"43",  "color": "#EFEFEF"},
            {"size": 44,  "id":"44",  "color": "#EFEFEF"},
        ],
        numberItem: 1,
        numberSize: 39,
    },
    chose:function(res){
        let numberL = this.data.BTarr.length
        for(let i = 0; i<numberL; i++){
            this.data.BTarr[i].color = "#EFEFEF"
        }
        let id = res.currentTarget.id
        this.data.BTarr[id].color = "#1AABAB"
        this.data.numberSize = this.data.BTarr[id].size
        this.setData({
            BTarr: this.data.BTarr,
            numberSize: this.data.numberSize
        })
    },
    numberChange: function(res){
        if(res.currentTarget.id == "1" && this.data.numberItem >1){
            this.data.numberItem--
            this.setData({
                numberItem: this.data.numberItem
            })
        }else if(res.currentTarget.id == "2"){
            this.data.numberItem++
            this.setData({
                numberItem: this.data.numberItem
            })
        }
    },
    payContent: function(){
        wx.navigateTo({
          url: '/pages/item1/home/homeContent/payContent/payContent',
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