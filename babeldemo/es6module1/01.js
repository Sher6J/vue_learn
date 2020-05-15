//定义方法，并声明可以被其他js调用，用关键字export
export function getList() {
    console.log('getList..........')
}
export function sum(a, b) {
    return parseInt(a) + parseInt(b)
}