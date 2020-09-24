<template>
  <div class="app-container">
    <el-button type="primary" @click="add">添加城市</el-button>
    <el-table
      :data="tableData"
      style="width: 100%"
    >

      <el-table-column
        type="index"
        label="序号"
        width="50"
      />
      <el-table-column
        prop="name"
        label="城市名称"
        width="180"
      />
      <el-table-column
        prop="index"
        label="索引"
      />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.row._id)"
          >编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row._id)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="pagesize"
      :current-page="currentPage"
      :total="total"
      @current-change="changePage"
    />
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'CityList',
  components: { },
  data() {
    return {
      currentPage: 1,
      pagesize: 3,
      total: 0,
      numm: 0,
      tableData: []
    }
  },
  computed: {
    count() {
      const num = (this.currentPage - 1) * 3
      var arr = []
      for (var i = 0; i < this.pagesize; i++) {
        arr.push(i)
      }
      return arr
    }
  },
  watch: {
    currentPage(newVal, oldVal) {
      if (newVal != oldVal) {
        this.numm = (newVal - 1) * pagesize
      }
    }
  },
  created() {
    this.getCitys()
  },
  methods: {
    add() {
      this.$router.push({
        path: '/city/create/'
      })
    },

    // 获取全部城市数据
    // getCitys() {
    //   axios.get('/citys').then(res => {
    //     console.log(res)
    //     if(res.data.code === 20000){
    //       this.tableData = res.data.list
    //     }
    //   })
    // },
    getCitys() {
      axios.get(`/citys?page=${this.currentPage}&pagesize=${this.pagesize}`).then(res => {
        this.tableData = res.data.list
        this.total = res.data.total
      })
    },
    handleEdit(id) {
      this.$router.push({
        path: '/city/edit/' + id
      })
    },
    handleDelete(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.delete('/delcity/' + id).then(res => {
          console.log(res)
          this.$message({
            type: 'success',
            message: res.data.msg
          })
          this.getCitys()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    changePage(page) {
      this.currentPage = page
      this.getCitys()
    }
  }
}
</script>

<style scoped>

</style>
