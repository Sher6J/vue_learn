<template>
    <div class="app-container">
        讲师添加
    <el-form label-width="120px">
      <el-form-item label="讲师名称">
        <el-input v-model="teacher.name"/>
      </el-form-item>
      <el-form-item label="讲师排序">
        <el-input-number v-model="teacher.sort" controls-position="right" min="0"/>
      </el-form-item>
      <el-form-item label="讲师头衔">
        <el-select v-model="teacher.level" clearable placeholder="请选择">
          <!--
            数据类型一定要和取出的json中的一致，否则没法回填
            因此，这里value使用动态绑定的值，保证其数据类型是number
          -->
          <el-option :value="1" label="高级讲师"/>
          <el-option :value="2" label="首席讲师"/>
        </el-select>
      </el-form-item>
      <el-form-item label="讲师资历">
        <el-input v-model="teacher.career"/>
      </el-form-item>
      <el-form-item label="讲师简介">
        <el-input v-model="teacher.intro" :rows="10" type="textarea"/>
      </el-form-item>
      <!-- 讲师头像：TODO -->
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
    </div>
</template>
<script>
import teacherapi from '@/api/edu/teacher'
export default {
    data () {
        return {
            teacher:{
                name:'',
                sort:0,
                level:1,
                career:'',
                intro:'',
                avatar:''
            },
            saveBtnDisabled: false //保存按钮是否禁用
        }
    },
    created() {
        this.init()
    },
    watch: { //监听
        $route(to, from) { //路由变化方式，路由发生变化，方法就会执行
            this.init()
        }  
    },
    methods: {
        init() {
            //判断路径是否有id值（是save还是update）
            //路径中有id值，做修改操作
            if(this.$route.params && this.$route.params.id) {
                //从路径获取id值
                const id = this.$route.params.id
                //调用根据id查询的方法
                this.getInfo(id)
            } else { //路径中没有id值，做添加
                //清空表单
                this.teacher = null;
            }
        },
        /**
         * 根据id获取讲师信息
         */
        getInfo(id) {
            teacherapi.getTeacherInfoById(id)
                .then(response => {
                    //teacher用v-model进行了双向绑定
                    this.teacher = response.data.teacher
                })
        },
        /**
         * 保存按钮绑定的修改/添加方法
         */
        saveOrUpdate() {
            //判断是修改还是添加，根据teacher对象中是否有id
            if(!this.teacher.id) {
                //添加
                this.saveTeacher()
            } else {
                //更新
                this.updateTeacher()
            }
        },
        /**
         * 添加讲师
         */
        saveTeacher() {
            teacherapi.addTeacher(this.teacher)
                .then(response => {
                    //提示添加成功
                    this.$message({
                        type: 'success',
                        message: '添加成功!'
                    });
                    //回到列表中————路由切换/跳转————重定向
                    this.$router.push({path:'/teacher/table'})
                })
        },
        /**
         * 修改讲师
         */
        updateTeacher() {
            teacherapi.updateTeacher(this.teacher)
                .then(response => {
                    //提示添加成功
                    this.$message({
                        type: 'success',
                        message: '修改成功!'
                    });
                    //回到列表中————路由切换/跳转————重定向
                    this.$router.push({path:'/teacher/table'})
                })
        }
    },
}
</script>
