//调用01.js中的方法
//引入01.js中的方法，m类似于java中的对象
import m from './01.js'

//调用方法
m.getList()
console.log(m.sum(3, 4))

//es6模块化的第二种写法，
//由于nodejs无法运行es6的模块化，所以讲es6的代码通过babel转成es5，到es6module22文件夹中