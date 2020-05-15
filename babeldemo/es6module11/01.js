'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getList = getList;
exports.sum = sum;
//定义方法，并声明可以被其他js调用，用关键字export
function getList() {
    console.log('getList..........');
}
function sum(a, b) {
    return parseInt(a) + parseInt(b);
}