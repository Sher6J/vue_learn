"use strict";

//转码前
//定义数据
var input = [1, 2, 3];
//将数组的每个元素+1
input = input.map(function (i) {
  return i + 1;
});
console.log(input);