//调用01.js中的方法
//引入01.js中的方法
import {getList, sum} from './01.js'

//调用方法
getList()
console.log(sum(1, 2)) 

//es6模块化的第一种写法，
//由于nodejs无法运行es6的模块化，所以讲es6的代码通过babel转成es5，到es6module11文件夹中