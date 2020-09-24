<template>
  <div class="app-container">
    <el-row>
      <el-col :span="6">
        <el-input
          v-model="textarea1"
          type="textarea"
          autosize
          placeholder="请输入内容"
        />
      </el-col>
    </el-row>

    <div class="demo-input-size">
      <el-input
        v-model="input1"
        placeholder="请输入内容"
        suffix-icon="el-icon-date"
      />
      <el-input
        v-model="input2"
        size="medium"
        placeholder="请输入内容"
        suffix-icon="el-icon-date"
      />
      <el-input
        v-model="input3"
        size="small"
        placeholder="请输入内容"
        suffix-icon="el-icon-date"
      />
      <el-input
        v-model="input4"
        size="mini"
        placeholder="请输入内容"
        suffix-icon="el-icon-date"
      />
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="日期" width="180" />
        <el-table-column prop="name" label="姓名" width="180" />
        <el-table-column prop="address" label="地址" />
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductList',
  components: {},
  filters: {},
  data() {
    return {
      textarea1: '',
      input1: '',
      input2: '',
      input3: '',
      input4: '',
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ]
    }
  },
  created() {},
  methods: {}
}
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
