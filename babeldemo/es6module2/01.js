//定义方法，并声明可以被其他js调用，用关键字export
export default {
    getList() {
        console.log('getList......')
    },
    sum(a, b) {
        return parseInt(a) + parseInt(b)
    }
}