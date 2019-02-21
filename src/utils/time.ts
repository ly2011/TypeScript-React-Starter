/**
 * 格式化时间
 */
export const formatDate = (str: number | string): string => {
  if (!str) return ''
  const date = new Date(str)
  const time = new Date().getTime() - date.getTime() // 现在的时间-传入的时间 = 相差的时间（单位 = 毫秒）
  if (time < 0) {
    return ''
  } else if (time / 1000 < 30) {
    return '刚刚'
  } else if (time / 1000 < 60) {
    return Math.floor(time / 1000) + '秒前'
  } else if (time / 60000 < 60) {
    return Math.floor(time / 60000) + '分钟前'
  } else if (time / 3600000 < 24) {
    return Math.floor(time / 3600000) + '小时前'
  } else if (time / 86400000 < 31) {
    return Math.floor(time / 86400000) + '天前'
  } else if (time / 2592000000 < 12) {
    return Math.floor(time / 2592000000) + '月前'
  } else {
    return Math.floor(time / 31536000000) + '年前'
  }
}
