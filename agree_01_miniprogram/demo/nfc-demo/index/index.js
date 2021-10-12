const app = getApp()

Page({
  nfc: null,

  onLoad: function () {
    const nfc = wx.getNFCAdapter()
    this.nfc = nfc
    const that = this

    function discoverHandler(res) {
      console.log("res: ", res)
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
            // this.read.id = that.byteToString(new Uint8Array(item.id));
            // this.read.type = that.byteToString(new Uint8Array(item.type));
            that.myShowModal(mypayload.slice(3))
          });
          console.log("payl:", payl);
        }
        // const ndef = nfc.getNdef()
        // ndef.onNdefMessage(message => {
        //   console.log("messsage:", message);
        // })
        // ndef.writeNdefMessage({
        //   uris: [''],
        //   complete(res) {
        //     console.log('res:', res)
        //   }
        // })
        return
      }

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

  onHide() {
    if (this.nfc) {
      this.nfc.stopDiscovery()
    }
  },

  nfc_func: function() {


    const nfc = wx.getNFCAdapter()
    this.nfc = nfc
    let _this = this


    function discoverHandler(res) {
        const data = new Uint8Array(res.id)
        let str = ""
        data.forEach(e => {
            let item = e.toString(16)
            if (item.length == 1) {
                item = '0' + item
            }
            item = item.toUpperCase()
            str += item
        })
        _this.setData({
            newCardCode: str
        })
        // 将其转换为uint8字节流
        // var uint8_msg = new Uint8Array(res.payload);
        // // 解码成字符串
        // var decodedString = String.fromCharCode.apply(null, uint8_msg);
        wx.showModal({
          title: '提示',
          content: str + "||" + JSON.stringify(res),
          success (res1) {
            if (res1.confirm) {
              console.log('用户点击确定')
            } else if (res1.cancel) {
              console.log('用户点击取消')
            }
          }
        })
    }

    nfc.startDiscovery({
        success(res) {
            wx.showToast({
                title: 'NFC读取功能已开启！',
                icon: 'none'
            })
            nfc.onDiscovered(discoverHandler)
        },
        fail(err) {if(!err.errCode){
              wx.showToast({
                title: '请检查NFC功能是否正常!',
                icon: 'none'
              })
              return
            }
            wx.showModal({
              title: '提示',
              content: JSON.stringify(err),
              success (res1) {
                if (res1.confirm) {
                  console.log('用户点击确定')
                } else if (res1.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          
            switch (err.errCode) {
                case 13000:
                  wx.showToast({
                    title: '设备不支持NFC!',
                    icon: 'none'
                  })
                  break;
                case 13001:
                  wx.showToast({
                    title: '系统NFC开关未打开!',
                    icon: 'none'
                  })
                  break;
                case 13019:
                  wx.showToast({
                    title: '用户未授权!',
                    icon: 'none'
                  })
                  break;
                case 13010:
                  wx.showToast({
                    title: '未知错误!',
                    icon: 'none'
                  })
                  break;
              }
        }
    })
},

  nfc_func1: function(){
    // 1、获取NFCAdapter实例对象
    let NFCAdapter = wx.getNFCAdapter();
    // 2、启动监听NFC标签
    NFCAdapter.startDiscovery({
      success: res => {
        this.title = '请将设备放入识别区NFC';
        console.log(res);
        this.myShowModal(JSON.stringify(res))
      },
      fail: error => {
        this.title = '刷新重试';
        console.error(error);
        this.myShowModal(JSON.stringify(error))
      },
      complete: res => {
        console.log(res);
        this.myShowModal(JSON.stringify(res))
      }
    });
    // 3、初始化监听回调事件
    this.myShowModal(JSON.stringify("111"));
    NFCAdapter.onDiscovered(callback => {
      // 4、设备放入识别区后，监听回调返回的对象callback 中处理获取到的标签内容
      this.myShowModal(JSON.stringify("222"));
      let aid = parseInt(this.ab2hex(callback.id), 16);
      if (callback.messages) {
        this.myShowModal(JSON.stringify("333"));
        let cordsArray = callback.messages[0].records;
        this.myShowModal(JSON.stringify("444"));
        let payl = ""
        cordsArray.find(item => {
          this.read.payload = this.byteToString(new Uint8Array(item.payload));
          payl = this.byteToString(new Uint8Array(item.payload))
          this.read.id = this.byteToString(new Uint8Array(item.id));
          this.read.type = this.byteToString(new Uint8Array(item.type));
        });
        this.myShowModal(JSON.stringify("555"));
        console.log("payl:", payl);
        this.myShowModal(JSON.stringify(payl));
        this.myShowModal(JSON.stringify("666"));
      }else{
        this.myShowModal("callback.message 不存在");
      }
    });
    

  },
    /**
   * 字节对象转字符串
   * @param {Object} arr
   */
  byteToString: function(arr) {
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
  ab2hex: function(buffer) {
    var hexArr = Array.prototype.map.call(
      new Uint8Array(buffer),

      function(bit) {
        return ('00' + bit.toString(16)).slice(-2);
      }
    );
    return hexArr.join('');
  },


  myShowModal: function(message){
    wx.showModal({
      title: '提示',
      content: message,
      success (res1) {
        if (res1.confirm) {
          console.log('用户点击确定')
        } else if (res1.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  //   测试nfc version 3 
  nfc_func2: function(){
    // 1、获取NFCAdapter实例对象
    let NFCAdapter = wx.getNFCAdapter();
    // // 监听 NDEF 信息
    // ndef.onNdefMessage(callback => {
    //   console.log(callback)
    // });
    // if (res.techs.includes(nfc.tech.ndef)) {
    //   console.log(res.messages)
    //   const ndef = nfc.getNdef()
    //   ndef.writeNdefMessage({
    //     uris: [''],
    //     complete(res) {
    //       console.log('res:', res)
    //     }
    //   })
    //   return
    // }

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
  },
})
