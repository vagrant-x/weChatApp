// pages/take_number/nfc_tips/nfc_tips.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        controllerId: "",
        token: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsiYWRhYXMiXSwidXNlcl9uYW1lIjoiYWRtaW4iLCJzY29wZSI6WyJkZXZpY2UiXSwiZXhwIjoxNjM0MjIxODgwLCJhdXRob3JpdGllcyI6WyJzdXBlcl9tYW5hZ2VyIl0sImp0aSI6ImE0ZDcyM2I0LTkzZTQtNDk5Yi1iNTIyLWRlMDM4NDg2OTBhNiIsImNsaWVudF9pZCI6ImNsaWVudF9wYXNzd29yZCJ9.Q0FfanIsuqtp6TYgWkeRgiFvmXVYS_AIFFHFRTOG1BHCQcrcZrQzfLMrSYBnXDgaujpqhUjJm0R8jYjJHmklQGJj0VTkx2b8Rw9v-irMWwuA3iWZP86CzxxsLg610aF6svEEbshuPWjpg-s8iF9NX8oukkHVRNN3lbyoT71TrHZ10JNAsjmu8fs1vCGnmPWmzspTtISV1F6zvC3Vryi-HZaRvyGfxKCHoGf0qcX3aHctAXPta9Djm1DgoD2Zw-bZ6drqqKv_PCf2qu5AxyrY3lRGqigpeLZ7kQd4eUQPy3HrxCKBg4L1pZR2MJ-_dU41zUA3GKMyh9-NmaqbBx6fdA",
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.bt_touch() // 调用读取NFC信息
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
 * 靠一靠调用方法：
 *  靠近NFC 读取里面controllerId
 */
    bt_touch: function () {
        const nfc = wx.getNFCAdapter()
        this.nfc = nfc
        const that = this

        function discoverHandler(res) {
            console.log("res: ", res)
            // NDEF
            if (res.techs.includes(nfc.tech.ndef)) {
                console.log(res.messages)
                if (res.messages) {
                    let cordsArray = res.messages[0].records;
                    let payl = ""
                    cordsArray.find(item => {
                        let mypayload = that.byteToString(new Uint8Array(item.payload));
                        let controllerId = mypayload.slice(3);
                        console.log("mypayload->:", mypayload);
                        let id = that.byteToString(new Uint8Array(item.id));
                        console.log("id->:", id);
                        let type1 = that.byteToString(new Uint8Array(item.type));
                        console.log("type1->:", type1);

                        wx.showModal({
                            title: '获取信息成功',
                            content: controllerId,
                            success(res1) {
                                if (res1.confirm) {
                                    // 停止读取NFC，跳转到身份证读取页面
                                    that.nfc.stopDiscovery({
                                        success: function () {
                                            //   that.myShowModal("停止发现NFC")
                                            let p_url = "/pages/take_number/tnm_scan_idr/tnm_scan_idr?controllerId=" + controllerId
                                            wx.redirectTo({
                                                url: p_url,
                                                success: function () {
                                                    console.log(`跳转到 ${p_url} 成功`)
                                                },
                                            })
                                        }
                                    })
                                } else if (res1.cancel) {
                                    that.myShowModal("请继续读取NFC信息")
                                }
                            }
                        })
                        // that.myShowModal(mypayload.slice(3))
                        // that.nfc.stopDiscovery({
                        //   success: function(){
                        //     that.myShowModal("停止发现NFC")
                        //   }
                        // })
                    });
                    console.log("payl:", payl);
                }
                return
            }
            // NFCA
            if (res.techs.includes(nfc.tech.nfcA)) {
                // const nfcA = nfc.getNFCA()
                // nfcA.transceive({
                //   data: new ArrayBuffer(0),
                //   complete(res) {
                //     console.log('res:', res)
                //   }
                // })
                return
            }
        }

        nfc.onDiscovered(discoverHandler)
        nfc.startDiscovery({
            fail(err) {
                console.log('failed to discover:', err)
                that.myShowModal(err.errMsg)
            }
        })
    },

    myShowModal: function (message) {
        wx.showModal({
            title: '提示',
            content: message,
            success(res1) {
                if (res1.confirm) {
                    console.log('用户点击确定')
                } else if (res1.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    },
    /**
  * 字节对象转字符串
  * @param {Object} arr
  */
    byteToString: function (arr) {
        if (typeof arr === 'string') {
            return arr;
        }
        var str = '',
            _arr = arr;
        for (var i = 0; i < _arr.length; i++) {
            var one = _arr[i].toString(2),
                v = one.match(/^1+?(?=0)/);
            if (v && one.length == 8) {
                var bytesLength = v[0].length;
                var store = _arr[i].toString(2).slice(7 - bytesLength);
                for (var st = 1; st < bytesLength; st++) {
                    store += _arr[st + i].toString(2).slice(2);
                }
                str += String.fromCharCode(parseInt(store, 2));
                i += bytesLength - 1;
            } else {
                str += String.fromCharCode(_arr[i]);
            }
        }
        return str;
    },
    /**
     * 格式化得到aid值
     * @param {Object} buffer
     */
    ab2hex: function (buffer) {
        var hexArr = Array.prototype.map.call(
            new Uint8Array(buffer),

            function (bit) {
                return ('00' + bit.toString(16)).slice(-2);
            }
        );
        return hexArr.join('');
    },

})