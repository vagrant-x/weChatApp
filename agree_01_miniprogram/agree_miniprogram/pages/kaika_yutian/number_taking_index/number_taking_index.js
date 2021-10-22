// pages/take_number/number_taking_method/number_taking_method.js
const utils = require("../../../utils/util.js")
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowModal: false, //是否显示自定义模态框
    bt_scan_data: "",  // 保存扫描返回数据，其中result为扫描内容
    url: {
      url_img_quhao: app.globalData.img_service + "/miniprogramImg/img_quhao"
    }
  },
  nfc: null,  // 保存调用NFC 对象


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
        console.log("scan res:", res)
        that.data.bt_scan_data = res;
        let p_url = "/pages/kaika_yutian/tnm_scan_idr/tnm_scan_idr?controllerId=" + that.data.bt_scan_data.result
        app.globalData.controllerId = that.data.bt_scan_data.result
        wx.navigateTo({
          url: p_url,
          success: function () {
            console.log(`跳转到 ${p_url} 成功`)
          },
        })
      }
    });
  },

  /**
   * 靠一靠调用方法：
   *  靠近NFC 读取里面controllerId
   */
  bt_touch: function () {
    let that = this
    wx.startHCE({ // 打开系统NFC
      aid_list: ['F222222222'],
      success(res) {
        console.log("startHCE->success：", res.errMsg)
        that.bt_touch_call_nfc()
      },
      fail(res) {
        console.log("startHCE->fail", res.errMsg)
      }
    })
  },

  // 调用 NFC 
  bt_touch_call_nfc: function () {
    const that = this
    const nfc = wx.getNFCAdapter()
    that.nfc = nfc

    function discoverHandler(res) {
      console.log("discoverHandler->res: ", res)
      // NDEF
      if (res.techs.includes(nfc.tech.ndef)) {
        // console.log(res.messages)
        if (res.messages) {
          let cordsArray = res.messages[0].records;
          let payl = ""
          cordsArray.find(item => {
            let mypayload = utils.byteToString(new Uint8Array(item.payload));
            console.log("mypayload->:", mypayload);
            let id = utils.byteToString(new Uint8Array(item.id));
            console.log("id->:", id);
            let type1 = utils.byteToString(new Uint8Array(item.type));
            console.log("type1->:", type1);

            app.globalData.controllerId = mypayload.slice(3) // controllerId 保存到全局
            // 模态窗口关闭
            that.setData({
              isShowModal: false
            })
            wx.showModal({
              title: 'NFC扫描成功',
              // content: mypayload.slice(3),  // 显示controllerId
              content: "请读取身份证信息",
              success(res1) {
                if (res1.confirm) {
                  that.nfc.stopDiscovery({
                    success: function () {
                      // that.myShowModal("停止发现NFC")
                      console.log("NFC扫描成功，调用stopDiscovery")
                    }
                  })
                  // 跳转到身份证读取页面
                  wx.navigateTo({
                    url: '/pages/kaika_yutian/tnm_scan_idr/tnm_scan_idr?transName=quhao',
                  })
                } else if (res1.cancel) {
                  console.log("用户取消读取身份证")
                  // that.myShowModal("继续发现NFC")
                  that.nfc.stopDiscovery({
                    success: function () {
                      console.log("NFC扫描成功，调用stopDiscovery")
                    }
                  })
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
      // if (res.techs.includes(nfc.tech.nfcA)) {
      //   const nfcA = nfc.getNFCA()
      //   nfcA.transceive({
      //     data: new ArrayBuffer(0),
      //     complete(res) {
      //       console.log('res:', res)
      //     }
      //   })
      //   return
      // }
    }

    nfc.onDiscovered(discoverHandler)
    nfc.startDiscovery({
      success(res) {
        console.log("startDiscovery->success")
        that.setData({ isShowModal: true })
      },
      fail(err) {
        console.log('failed to discover:', err)
        if (err.errCode == 13000) {
          that.myShowModal("设备不支持NFC", "请使用支持NFC的设备进行操作。")
        } else if (err.errCode == 13001) {
          that.myShowModal("系统NFC开关未打开", "请打开NFC开关后再尝试。")
        } else if (err.errCode == 13021) { // 已经开始NFC扫描
          that.setData({ isShowModal: true })
        } else {
          that.myShowModal("调用NFC出错", err)
        }
      }
    })
  },

  // 通过模态框显示提示
  myShowModal: function (title, message) {
    wx.showModal({
      title: title,
      content: JSON.stringify(message),
      success(res1) {
        if (res1.confirm) {
          console.log('用户点击确定')
        } else if (res1.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  //=====================================================================

  //   /**
  // * 字节对象转字符串
  // * @param {Object} arr
  // */
  //   byteToString: function (arr) {
  //     if (typeof arr === 'string') {
  //       return arr;
  //     }
  //     var str = '',
  //       _arr = arr;
  //     for (var i = 0; i < _arr.length; i++) {
  //       var one = _arr[i].toString(2),
  //         v = one.match(/^1+?(?=0)/);
  //       if (v && one.length == 8) {
  //         var bytesLength = v[0].length;
  //         var store = _arr[i].toString(2).slice(7 - bytesLength);
  //         for (var st = 1; st < bytesLength; st++) {
  //           store += _arr[st + i].toString(2).slice(2);
  //         }
  //         str += String.fromCharCode(parseInt(store, 2));
  //         i += bytesLength - 1;
  //       } else {
  //         str += String.fromCharCode(_arr[i]);
  //       }
  //     }
  //     return str;
  //   },


  // /**
  //  * 格式化得到aid值
  //  * @param {Object} buffer
  //  */
  // ab2hex: function (buffer) {
  //   var hexArr = Array.prototype.map.call(
  //     new Uint8Array(buffer),

  //     function (bit) {
  //       return ('00' + bit.toString(16)).slice(-2);
  //     }
  //   );
  //   return hexArr.join('');
  // },


  // // 请求token
  // getToken: function () {
  //   let this_page = this
  //   wx.request({
  //     url: 'https://www.xiongweixp.tech/adaas/token?username=admin&password=admin&grant_type=password&scope=device&client_id=client_password&client_secret=123456', //仅为示例，并非真实的接口地址
  //     method: "POST",
  //     header: {
  //       'content-type': 'application/json' // 默认值
  //     },
  //     success(res) {
  //       console.log(res)
  //       let app = getApp()
  //       app.globalData.token = res.data.access_token
  //       this_page.data.token = res.data.access_token
  //       console.log("取号 token : ", app.globalData.token)
  //     }
  //   })
  // },

  //=====================================================================
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

})