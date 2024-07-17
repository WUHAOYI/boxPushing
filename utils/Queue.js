//队列：用于历史记录的存储和更新
function Queue() {
  // 属性
  var items = [] //队列元素存储
  // 方法
  //入队列
  this.EnQueue = function (element) {
    items.push(element)
  }
  //出队列
  this.DeQueue = function () {
    return items.shift()
  }
  //获取队头元素
  this.front = function () {
      return items[0]
    },
    //获取队尾元素
    this.rear = function () {
      return items[items.length - 1]
    },
    //查看队列是否为空
    this.isEmpty = function () {
      return items.length == 0
    },
    //查看队列中元素的个数
    this.size = function () {
      return items.length
    },
    //清空队列
    this.clear = function () {
      items = []
    },
    //打印队列中元素
    this.print = function () {
      for (var i = 0; i < items.length; i++) {
        console.log(items[i])
      }
    },
    //队列初始化
    this.Init = function (element) {
      items = element
    }
}
var queue = new Queue()
module.exports = {
  queue: queue
}