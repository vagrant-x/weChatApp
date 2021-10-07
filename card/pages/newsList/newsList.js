// pages/newsList/newsList.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        topBars: [
            {id:1, name:"关注"},
            {id:2, name:"推荐"},
            {id:3, name:"直播"},
            {id:4, name:"影视"},
            {id:5, name:"游戏"},
            {id:6, name:"新闻"},
        ],
        selectTypeId: 1,
        newsList: [
            {
                id: 1, 
                userName: "靓仔",
                headUrl: "../../img/user1.jpg",
                isFocus: false,
                newsTitle: "只争朝夕 不负韶华",
                isVideo: true,
                videoUrl: "https://zsb.gdut.edu.cn/__local/2/98/7E/93E77D2CCC42DC1667B4D29B3B1_CEB5674E_4DBFDA7.mp4?e=.mp4",
                newsText: null,
                newsAbstrack: null,
                imageUrl: null,
                isOriginal: true,
                careateTime: "2021-10-7T14:39:00",
            },
            {
                id: 2, 
                userName: "靓仔2",
                headUrl: "../../img/user1.jpg",
                isFocus: true,
                newsTitle: "腾讯课堂",
                isVideo: false,
                videoUrl: null,
                newsText: "<p><span>腾讯课堂是腾讯推出的专业在线教育平台，聚合大量优质教育机构和名师，下设职业培训、公务员考试、托福雅思、考证考级、英语口语、中小学教育等众多在线学习精品课程，打造老师在线上课教学、学生及时互动学习的课堂。</span></p>",
                newsAbstrack: "2010-10-7腾讯课堂课程更新",
                imageUrl: "../../img/cover.png",
                isOriginal: false,
                careateTime: "2021-10-7T14:39:00",
            },
        ]
    },
    selectBar: function(e){
        console.log(e)
        let id = e.currentTarget.dataset.val.id;
        let name = e.currentTarget.dataset.val.name;
        console.log(name, id);
        this.setData({
            selectTypeId: id,
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