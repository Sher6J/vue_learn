//创建js方法
const sum = function(a, b) {
    return parseInt(a) + parseInt(b)
}
const sub = function(a, b) {
    return parseInt(a) - parseInt(b)
}

//默认这些方法别人调不到，相当于java中的private

//设置哪些方法可以被其他js调用
module.exports = {
    sum,
    sub
}