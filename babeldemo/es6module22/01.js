'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
//定义方法，并声明可以被其他js调用，用关键字export
exports.default = {
    getList: function getList() {
        console.log('getList......');
    },
    sum: function sum(a, b) {
        return parseInt(a) + parseInt(b);
    }
};