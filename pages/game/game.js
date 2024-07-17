var data = require('../../utils/data.js') //地图数据
var Stack = require('../../utils/Stack.js') //栈
var Queue = require('../../utils/Queue.js') //队列
var tool = require('../../utils/util.js') //其他tools
//地图
var map = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0]
]
//箱子
var box = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0]
]
var w = 40 //每个物体的大小
//记录人物的位置
var row = 0
var col = 0
//游戏历史记录
var history = [
  [],
  [],
  [],
  []
]
//当前日期
var date = new Date();
var now = tool.formatTime(date).originDate
//栈和队列
var stack = Stack.stack
var queue = []
for (var i = 0; i < 4; i++) {
  queue[i] = Queue.queue
}
//最短路径
var shortestStep = tool.shortestStep
Page({
  data: {
    level: 1, //关卡
    step: 0, //移动步数
    shortestStep: 10 //最短路径
  },

  //初始化地图
  initMap: function (level) {
    let mapInit = data.maps[level - 1]
    for (var i = 0; i < 8; i++) {
      for (var j = 0; j < 8; j++) {
        box[i][j] = 0
        map[i][j] = mapInit[i][j]
        if (mapInit[i][j] == 4) {
          box[i][j] = 4
          map[i][j] = 2
        } else if (mapInit[i][j] == 5) {
          map[i][j] = 2
          row = i
          col = j
        }
      }
    }
  },

  //绘制地图
  drawMap: function () {
    let ctx = this.ctx
    ctx.clearRect(0, 0, 320, 320)
    for (var i = 0; i < 8; i++) {
      for (var j = 0; j < 8; j++) {
        var img = 'stone'
        if (map[i][j] == 1) {
          img = 'wall'
        } else if (map[i][j] == 3) {
          img = 'diamond'
        }
        ctx.drawImage('/images/' + img + '.png', j * w, i * w, w, w)
        //箱子
        if (box[i][j] == 4) {
          ctx.drawImage('/images/box.png', j * w, i * w, w, w)
        }
      }
    }
    ctx.drawImage('/images/bird.png', col * w, row * w, w, w)
    ctx.draw()
  },

  //四个方向键
  //上
  up: function () {
    var step = this.data.step
    //不在最顶端
    if (row > 0) {
      //没遇到墙并且上方不是箱子
      if (map[row - 1][col] != 1 && box[row - 1][col] != 4) {
        row = row - 1
        step++
        stack.push("up1")
      }
      //上方是箱子，和箱子一起移动
      else if (box[row - 1][col] == 4) {
        if (row - 1 > 0) {
          if (map[row - 2][col] != 1 && box[row - 2][col] != 4) {
            box[row - 2][col] = 4
            box[row - 1][col] = 0
            row = row - 1
            step++;
            stack.push("up2")
          }
        }
      }
      this.drawMap()
      this.forWin()
      this.setData({
        step
      })
    }
  },

  //下
  down: function () {
    var step = this.data.step
    if (row < 7) {
      if (map[row + 1][col] != 1 && box[row + 1][col] != 4) {
        row = row + 1
        step++
        stack.push("down1")
      } else if (box[row + 1][col] == 4) {
        if (row + 1 < 7) {
          if (map[row + 2][col] != 1 && box[row + 2][col] != 4) {
            box[row + 2][col] = 4
            box[row + 1][col] = 0
            row = row + 1
            step++
            stack.push("down2")
          }
        }
      }
      this.drawMap()
      this.forWin()
      this.setData({
        step
      })
    }
  },

  //左
  left: function () {
    var step = this.data.step
    if (col > 0) {
      if (map[row][col - 1] != 1 && box[row][col - 1] != 4) {
        col = col - 1
        step++
        stack.push("left1")
      } else if (box[row][col - 1] == 4) {
        if (col - 1 > 0) {
          if (map[row][col - 2] != 1 && box[row][col - 2] != 4) {
            box[row][col - 2] = 4
            box[row][col - 1] = 0
            col = col - 1
            step++
            stack.push("left2")
          }
        }
      }
      this.drawMap()
      this.forWin()
      this.setData({
        step
      })
    }
  },

  //右
  right: function () {
    var step = this.data.step
    if (col < 7) {
      if (map[row][col + 1] != 1 && box[row][col + 1] != 4) {
        col = col + 1
        step++
        stack.push("right1")
      } else if (box[row][col + 1] == 4) {
        if (col + 1 < 7) {
          if (map[row][col + 2] != 1 && box[row][col + 2] != 4) {
            box[row][col + 2] = 4
            box[row][col + 1] = 0
            col = col + 1
            step++
            stack.push("right2")
          }
        }
      }
      this.drawMap()
      this.forWin()
      this.setData({
        step
      })
    }
  },

  //判断是否获胜
  isWin: function () {
    for (var i = 0; i < 8; i++) {
      for (var j = 0; j < 8; j++) {
        if (box[i][j] == 4 && map[i][j] != 3) {
          return false
        }
      }
    }
    return true
  },

  //如果通过关卡（只有通过关卡之后才会存储游戏记录）
  forWin: function () {
    var that = this
    var level = that.data.level //获取当前关卡
    var step = that.data.step //获取当前移动步数
    if (this.isWin()) { //如果已经通过当前关卡
      if (level != 4) { //未到达最后一关
        wx.showModal({
          title: '恭喜',
          content: '游戏成功！',
          showCancel: true,
          cancelText: "再来一次",
          confirmText: "下一关",
          success(res) {
            for (var i = 1; i <= 3; i++) { //修改历史记录
              if (level == i) {
                queue[i - 1].Init(history[i - 1])
                queue[i - 1].EnQueue({ //向队列中存储数据
                  step: step + 1,
                  level: level,
                  date: now
                })
                that.InsertionSort(i) //插入排序
                //history[i - 1].push(queue[i - 1].front())
                var min = queue[i - 1].front()
                while (history[i - 1].length > 4) {
                  queue[i - 1].DeQueue() //队首元素出队
                }
                history[i - 1].unshift(min)
              }
            }
            if (res.confirm) { //确认进入下一关
              level++
              that.initMap(level)
              that.drawMap()
              that.setData({
                level: level,
                step: 0,
                shortestStep: shortestStep[level - 1]
              })
              //that.BFS()
              stack.clear()
              wx.setStorageSync('history', history) //存储历史记录
            } else if (res.cancel) { //重新开始该关卡
              wx.setStorageSync('history', history)
              that.restartGame()
            }

          }
        })
      } else { //已经到达最后一关
        wx.showModal({
          title: '恭喜',
          content: '您已通关！',
          showCancel: true,
          cancelText: "再来一次",
          confirmText: "退出游戏",
          success(res) { //修改历史记录
            queue[3].Init(history[3])
            queue[3].EnQueue({ //向队列中存储数据
              step: step + 1,
              level: level,
              date: now
            })
            //history[3].push(queue[3].front())
            if (res.confirm) { //确认退出游戏
              wx.setStorageSync('history', history)
              var pages = getCurrentPages();
              var prevPage = pages[pages.length - 2];
              wx.navigateBack({
                delta: 1,
              })
            } else if (res.cancel) { //重新开始该关卡
              wx.setStorageSync('history', history)
              that.restartGame()
            }
          }
        })
      }
    }
  },

  //重新开始该关卡
  restartGame: function () {
    this.initMap(this.data.level)
    this.drawMap()
    this.setData({
      step: 0
    })
    stack.clear()
  },

  //后退至上一步的操作
  back: function name() {
    var step = this.data.step
    if (!stack.isEmpty()) {
      step++
      var lastOperation = stack.peek()
      stack.pop()
      switch (lastOperation) {
        case "up1":
          row = row + 1
          this.drawMap()
          break;
        case "up2":
          row = row + 1
          box[row - 2][col] = 0
          box[row - 1][col] = 4
          this.drawMap()
          break;
        case "down1":
          row = row - 1
          this.drawMap()
          break;
        case "down2":
          row = row - 1
          box[row + 2][col] = 0
          box[row + 1][col] = 4
          this.drawMap()
          break;
        case "left1":
          col = col + 1
          this.drawMap()
          break;
        case "left2":
          col = col + 1
          box[row][col - 2] = 0
          box[row][col - 1] = 4
          this.drawMap()
          break;
        case "right1":
          col = col - 1
          this.drawMap()
          break;
        case "right2":
          col = col - 1
          box[row][col + 2] = 0
          box[row][col + 1] = 4
          this.drawMap()
          break;
      }
      this.setData({
        step
      })
    }
  },

  //选择关卡
  choose: function () {
    wx.navigateTo({
      url: '/pages/choose/choose',
    })
  },

  //onload
  onLoad: function (options) {
    let level = options.level
    this.setData({
      level: parseInt(level)
    })
    this.ctx = wx.createCanvasContext('myCanvas')
    this.initMap(level)
    this.drawMap()
    wx.getStorage({
      key: 'history',
      success(res) {
        history = res.data
      }
    })
    this.setData({
      shortestStep: shortestStep[level - 1]
    })
    //this.BFS()
  },

  //直接插入排序——用于对历史记录以移动步数step为关键字进行升序排序
  InsertionSort: function (element) {
    var i, j, temp;
    for (i = 1; i < history[element - 1].length; i++) {
      if (history[element - 1][i].step < history[element - 1][i - 1].step) {
        temp = history[element - 1][i]

        for (j = i - 1; j >= 0; j--) {
          history[element - 1][j + 1] = history[element - 1][j]
        }
        history[element - 1][j + 1] = temp;
      }
    }
  },

  //广度优先搜索——用于求每一关的最短路径
  BFS: function () {
    var mapn = data.maps[this.data.level - 1] //获取当前地图
    var i = 0,
      j = 0
    var reg = new RegExp(",", "g") //将地图的存储格式转换为字符串
    var mp = [] //存储地图
    var line = mapn.toString().replace(reg, "") //整个地图数据的线性存储
    var sta = '' //起始
    var en = '' //终点
    var col = 8 //列数
    var px = -1,
      py = -1 //人物的起始位置
    var npx, npy, nnpx, nnpy //人物移动一次及两次后的位置坐标
    var paths = [] //最短路径数组
    var path = '' //存储每次的路径
    var len = -1
    var visited = {} //路径是否访问过的标志
    var ppos, pos, npos //人物起始位置、移动一次的位置、移动两次的位置
    var strArray, new_str
    var is_okFlag = true //是否为最短路径的标志
    for (var i = 0; i < mapn.length; i++) {
      var maps = mapn[i].toString()
      mp.push(maps.replace(reg, ""))
    } //将地图数据转换为字符串
    for (i = 0; i < mp.length; i++) {
      for (j = 0; j < mp[i].length; j++) {
        if (mp[i][j] == 5) {
          px = i
          py = j
        }
      }
    } //求得人物起始的位置坐标

    //设置开始结束状态
    var staDic = {
      '0': '0',
      '1': '0',
      '2': '0',
      '3': '0',
      '4': '4',
      '5': '5',
    }
    var enDic = {
      '0': '0',
      '1': '1',
      '2': '0',
      '3': '3',
      '4': '0',
      '5': '0',
    } //只标识人物的位置、墙体、箱子起始位置、箱子终点，其余路径当做无关项
    for (i = 0; i < line.length; i++) {
      sta += staDic[line[i]];
      en += enDic[line[i]]
    } //初始化起始路径和最终路径
    var moveOperation = [
      [-1, 0, 'u', 'U'],
      [1, 0, 'd', 'D'],
      [0, 1, 'r', 'R'],
      [0, -1, 'l', 'L']
    ] //上下左右进行的操作
    //小写代表人物自己移动，大写代表人物和箱子一起移动 
    var states = [
      [sta, '', px, py]
    ] //当前状态
    visited[sta] = 1
    var s_len = 1000
    console.log("路径集合为：")
    while (states.length > 0) {
      sta = states[0][0]
      path = states[0][1]
      px = states[0][2]
      py = states[0][3]
      ppos = px * col + py;
      states.shift()
      if (path.length > s_len) {
        break;
      }
      for (i = 0; i < sta.length; i++) {
        if (sta[i] != '4' && en[i] == '3') //如果起始路径和最终路径不匹配
        {
          is_okFlag = false //则不为最短路径
          break
        }
      }
      if (is_okFlag) {
        if (len == -1 || path.length == len) {
          paths.push(path) //存储最短路径
          len = path.length
        }
        continue;
      } else {
        is_okFlag = true
      }
      for (i = 0; i < moveOperation.length; i++) {
        npx = px + moveOperation[i][0]
        npy = py + moveOperation[i][1]
        pos = npx * col + npy
        nnpx = px + moveOperation[i][0] * 2
        nnpy = py + moveOperation[i][1] * 2
        npos = nnpx * col + nnpy
        if (nnpx < 0 && nnpx >= col && nnpy < 0 && nnpy >= col) {
          continue
        }
        if (sta[pos] == '4' && sta[npos] == '0' && en[npos] != '1') { //人和箱子一起移动
          strArray = sta.split("")
          strArray[ppos] = '0'
          strArray[pos] = '5'
          strArray[npos] = '4'
          new_str = strArray.toString().replace(reg, "")
          if (visited[new_str] == undefined) {
            visited[new_str] = 1
            states.push([new_str, path + moveOperation[i][3], npx, npy])
          }
        } else if (sta[pos] == '0' && en[pos] != '1') { //人移动但箱子不移动
          strArray = sta.split("")
          strArray[ppos] = '0'
          strArray[pos] = '5'
          new_str = strArray.toString().replace(reg, "")
          if (visited[new_str] == undefined) { //存储访问过的路径
            visited[new_str] = 1
            states.push([new_str, path + moveOperation[i][2], npx, npy])
          }
        }
      }
    }

    console.log("最短路径为：" + paths) //打印最短路径
    this.setData({
      shortestStep: paths[0].length
    })
  },
  //当玩家无法顺利进行游戏时，可点击游戏界面的“求助”按钮
  helpMe: function () {
    var that = this
    var level = this.data.level
    var path = tool.shortestPaths[level - 1]
    for (var i = 0; i < path.length; i++) {
      (function (t) {
        setTimeout(function () {
          console.log(t)
          switch (path[t]) {
            case 'u':
              that.up()
              break
            case 'U':
              that.up()
              break
            case 'd':
              that.down()
              break
            case 'D':
              that.down()
              break
            case 'l':
              that.left()
              break
            case 'L':
              that.left()
              break
            case 'r':
              that.right()
              break
            case 'R':
              that.right()
              break
          }
        }, 1000 * t)
      })(i)
    }
  }
})