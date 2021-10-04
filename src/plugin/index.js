
import { Message } from 'element-ui';
const MyPlugins = {}

MyPlugins.install = function (Vue, options) {
  Vue.prototype.BASE_URL = 'http://120.24.30.105:8088/'
  Vue.prototype.IMG_URL = 'http://120.24.30.105:8001/'
  Vue.prototype.$message = Message
  Vue.filter('formatDate', (time, cFormat) => {
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
    const date = new Date(time)
    const formatObj = {
      y: date.getFullYear(),
      m: date.getMonth() + 1,
      d: date.getDate(),
      h: date.getHours(),
      i: date.getMinutes(),
      s: date.getSeconds(),
      a: date.getDay()
    }
    const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
      const value = formatObj[key]
      // Note: getDay() returns 0 on Sunday
      if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
      return value.toString().padStart(2, '0')
    })
    return time_str
  })
}
export default MyPlugins