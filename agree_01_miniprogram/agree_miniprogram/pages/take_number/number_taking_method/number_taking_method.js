// pages/take_number/number_taking_method/number_taking_method.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bt_scan_data: "",
    token: null,
  },
  that: this,
  nfc: null,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getToken()
    // this.call_idr()
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
  bt_scan: function () {
    let that = this;
    console.log("function: bt_touch");
    // 允许从相机和相册扫码
    wx.scanCode({
      success(res) {
        console.log(res)
        that.data.bt_scan_data = res;
        wx.showModal({
          title: '提示',
          // content: JSON.stringify(res),
          content: res.result,
          success(res1) {
            if (res1.confirm) {
              console.log('用户点击确定')
            } else if (res1.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    });
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
            console.log("mypayload->:", mypayload);
            let id = that.byteToString(new Uint8Array(item.id));
            console.log("id->:", id);
            let type1 = that.byteToString(new Uint8Array(item.type));
            console.log("type1->:", type1);

            wx.showModal({
              title: '是否停止发现NFC',
              content: mypayload.slice(3),
              success(res1) {
                if (res1.confirm) {
                  that.nfc.stopDiscovery({
                    success: function () {
                      that.myShowModal("停止发现NFC")
                    }
                  })
                } else if (res1.cancel) {
                  that.myShowModal("继续发现NFC")
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
        const nfcA = nfc.getNFCA()
        nfcA.transceive({
          data: new ArrayBuffer(0),
          complete(res) {
            console.log('res:', res)
          }
        })
        return
      }
    }

    nfc.onDiscovered(discoverHandler)
    nfc.startDiscovery({
      fail(err) {
        console.log('failed to discover:', err)
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


  // 请求token
  getToken: function () {
    let this_page = this
    wx.request({
      url: 'https://www.xiongweixp.tech/adaas/token?username=admin&password=admin&grant_type=password&scope=device&client_id=client_password&client_secret=123456', //仅为示例，并非真实的接口地址
      method: "POST",
      // data: {
      //   username: 'admin',
      //   password: 'admin',
      //   grant_type: 'password',
      //   scope: 'device',
      //   client_id: 'client_password',
      //   client_secret: '123456',
      // },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res)
        let app = getApp()
        app.globalData.token = res.data.access_token
        this_page.data.token = res.data.access_token
        console.log("取号 token : ", app.globalData.token)
        this_page.call_idr()
      }
    })
  },

  //call idr： 调用身份证
  call_idr: function(){
    let bearer_token =  'Bearer ' + this.data.token
    console.log("bearer_token :", bearer_token)
    wx.request({
      url: 'https://www.xiongweixp.tech/adaas/service', 
      method: "POST",
      data: {
        "header": {
            "namespace": "ADaaS.Post",
            "resource": "Controller",
            "name": "TestDevice",
            "version": "1"
        },
        "payload": {
            "controllerId": "0000202B09D7",
            "deviceId": "514B2AFA",
            "category": "idr"
        }
    },
      header: {
        'content-type': 'application/json', // 默认值
        'Authorization': bearer_token, //token
      },
      success(res) {
        console.log(res)
      }
    })
  },
})