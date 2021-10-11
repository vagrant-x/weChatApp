const app = getApp()

Page({
  nfc: null,

  onLoad: function () {
    const nfc = wx.getNFCAdapter()
    this.nfc = nfc

    function discoverHandler(res) {
      if (res.techs.includes(nfc.tech.ndef)) {
        console.log(res.messages)
        const ndef = nfc.getNdef()
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
  }
})
