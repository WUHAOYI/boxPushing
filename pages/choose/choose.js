
Page({

  data: {
choose:[1,2,3,4]
  },
//跳转不同的关卡
goto:function(e)
{
  var level = e.currentTarget.dataset.level
  wx.navigateTo({
    url: '/pages/game/game?level=' + level,
  })
  var pages = getCurrentPages();
  var prevPage = pages[pages.length - 2];
  console.log(pages)
  console.log(prevPage)
}
})