<template>
    <div class="app-container">
        讲师列表
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="teacherQueryVo.name" placeholder="讲师名"/>
      </el-form-item>
      <el-form-item>
        <el-select v-model="teacherQueryVo.level" clearable placeholder="讲师头衔">
          <el-option :value="1" label="高级讲师"/>
          <el-option :value="2" label="首席讲师"/>
        </el-select>
      </el-form-item>
      <el-form-item label="添加时间">
        <el-date-picker
          v-model="teacherQueryVo.begin"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="teacherQueryVo.end"
          type="datetime"
          placeholder="选择截止时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>
    <!-- 表格 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="数据加载中"
      border
      fit
      highlight-current-row>
      <el-table-column
        label="序号"
        width="70"
        align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="名称" width="80" />
      <el-table-column label="头衔" width="80">
        <!-- ==判断值 ===判断类型和值 例如1和'1'-->
        <template slot-scope="scope">
            {{ scope.row.level===1?'高级讲师':'首席讲师' }}
        </template>
      </el-table-column>
      <el-table-column prop="intro" label="资历" />
      <el-table-column prop="gmtCreate" label="添加时间" width="160"/>
      <el-table-column prop="sort" label="排序" width="60" />
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/teacher/update/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>
          <!--scope表示整个表格，row为表格中的一行，id即为此行数据的id-->
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>  
    <!-- 分页 -->
    <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="getList"
    />      
    </div>
</template>
<script>
//引入调用的teacher.js文件
import teacher from '@/api/edu/teacher'
export default {
    //写核心代码位置
    // data: {

    // },
    data() { //定义数据变量和初始值
        return {
            list: null, //查询之后接口返回集合
            page: 1, //当前页
            limit: 3, //每页记录数
            total: 0, //总记录数
            //条件封装对象，可以不定义具体对象，JS会根据上面的代码生成出来name,level等对象
            teacherQueryVo:{}
        }
    },
    created() { //在页面渲染之前执行，一般调用methods中定义的方法
        this.getList()
    },
    methods: { //创建具体的方法，调用teacher.js定义的方法
        //讲师列表的方法
        getList(page = 1) {
            this.page = page
            teacher.getTeacherListPage(this.page, this.limit, this.teacherQueryVo)
                .then(response => {//then()请求成功
                    //response是接口返回的数据
                    // console.log(response)
                    this.list = response.data.rows
                    this.total = response.data.total
                    console.log(this.list)
                    console.log(this.total)
                }) 
                .catch(error => {console.log(error)}) //请求失败
        },
        /**
         * 清空查询条件
         * 1.查询条件表单输入项数据清空
         * 2.查询所有
         */
        resetData() {
            //1.清空表单数据——由于是双向绑定，一方位空，另一方自然没了
            this.teacherQueryVo = {}
            //2.查询所有
            this.getList();

        },
        /**
         * 删除讲师的方法
         */
        removeDataById(id) {
            this.$confirm('此操作将永久删除该讲师记录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => { //点击确定，执行then
                //调用删除代码
                teacher.deleteTeacherById(id)
                  .then(response => {
                    //提示信息
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    //回到重新刷新的列表页面
                    this.getList()
                })
            // }).catch(() => { //点击取消，执行catch
            //     this.$message({
            //         type: 'info',
            //         message: '已取消删除'
            //     });          
            });
        }
    },
}
</script>

