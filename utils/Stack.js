//栈，用于存储推箱子的每一步
function Stack() {
  var items = []; //用来保存栈里的元素
  this.push = function (element) {
    items.push(element);
  }
  this.pop = function () {
    return items.pop();
  }
  this.peek = function () {
    return items[items.length - 1];
  }
  this.isEmpty = function () {
    return items.length == 0;
  }
  this.size = function () {
    return items.length;
  }
  this.clear = function () {
    items = [];
  }
  this.print = function () {
    console.log(items.toString());
  }
}
var stack = new Stack()
module.exports = {
  stack: stack
}