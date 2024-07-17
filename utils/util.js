const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}
//时间格式
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return {
    originDate: [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':'),
    formatDate: year + '-' + (month - 1) + '-' + day
  }
}
//利用BFS求得最短路径并存储
const shortestStep = [10, 51, 51, 61]
//记录最短路径
const shortestPaths = ['DuLLrUUdrR','UUddllddrrUUddrruLdllluurrUrDlllddrrUUruLdddrUUllUU','urDrrddrddLLulLdlUrrrdrruuluullDDuurrddrddllLLrruLL','lUUUUluRRDlddddrrruuLUdLrrddllluUUUruLdddddlluuRlddrruUUdrUUL']
module.exports = {
  formatTime: formatTime,
  shortestStep: shortestStep,
  shortestPaths:shortestPaths,
}