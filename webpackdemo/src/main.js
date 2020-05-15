const common = require('./common') //./common.js的js可以省略
const utils = require('./utils')
require('./style.css') //.css后缀不能省略

common.info('hello common' + utils.add(2, 6))