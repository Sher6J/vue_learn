import request from '@/utils/request'

export default {
    //1.讲师列表（条件查询分页）
    /**
     * 
     * @param {*} current 当前页
     * @param {*} limit 每页记录数
     * @param {*} teacherQueryVo 查询条件对象
     */
    getTeacherListPage(current, limit, teacherQueryVo) {
        return request({
            // url: '/table/list' + current + "/" + limit, //第一种方式，直接字符串拼接
            url: `/eduservice/edu-teacher/pageTeacherCondition/${current}/${limit}`, //接口地址
            method: 'post',
            //teacherQueryVo查询你条件对象，后端使用RequestBody获取数据，前端需要用data属性
            //data表示把对象转换成json传递到接口里面
            data: teacherQueryVo
          })
    },
    /**
     * 删除讲师
     * @param {*} id 讲师id 
     */
    deleteTeacherById(id) {
        return request({
            url: `/eduservice/edu-teacher/${id}`, //接口地址
            method: 'delete'
          })
    }
}