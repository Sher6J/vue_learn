'use strict';

var _ = require('./01.js');

//调用方法
(0, _.getList)(); //调用01.js中的方法
//引入01.js中的方法

console.log((0, _.sum)(1, 2));