Page({
  data: {
    history: []
  },

  //读取缓存，获取历史记录
  onLoad: function (options) {
    var that = this
    wx.getStorage({
      key: 'history',
      success(res) {
        that.setData({
          history:res.data
        })
      }
    })

  },



})