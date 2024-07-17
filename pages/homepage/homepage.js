// pages/homepage/homepage.js
Page({

  data: {
  level:1
  },

  help:function()
  {
    wx.navigateTo({
      url: '/pages/help/help',
    })
  },
  begin:function()
  {
    wx.navigateTo({
      url: '/pages/game/game?level='+ this.data.level
    })
  },
  history:function () {
    wx.navigateTo({
      url: '/pages/history/history',
    })
  },
  choose:function()
  {
    wx.navigateTo({
      url: '/pages/choose/choose',
    })
  }
})