<template>
  <div class="app-container">
    <el-row>
      <el-col :span="12">
        <el-form ref="form" label-width="80px">
          <el-form-item label="城市名称">
            <el-input v-model="city.name" @input="getFistLeter"></el-input>
          </el-form-item>
          <el-form-item label="索引">
            <el-input v-model="city.index"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button @click="cancel">取消</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
import pinyin from 'pinyin'
export default {
  name: 'CreateCity',
  data() {
    return {
      city: {
        name: '',
        index: 'A'
      }
    }
  },
  created() {
    // 这个是获取数据，然后填充在页面上
    this.id = this.$route.params.id
    this.getData(this.id)
  },
  methods: {
    getData(id) {
      axios.get('/city/'+id).then(res => {
        this.city.name = res.data.data.name
        this.city.index = res.data.data.index
      })
    },
    // 重置
    cancel() {
      this.city.name = ''
      this.city.index = ''
    },
    // 提交添加
    onSubmit() {
      axios.put('/city/edit/'+this.id, {
        name: this.city.name,
        index: this.city.index
      }).then(res => {
        if(res.data.code === 20000){
          this.$message({
            message: res.data.msg,
            type: 'success'
          })
          this.$router.push({
            path: '/city/list'
          })
        }
      })
    },
    // 获取城市的第一个大写字符
    getFistLeter() {
      if(this.city.name){
        var first = pinyin(this.city.name[0], {
          style: pinyin.STYLE_FIRST_LETTER
        })
        console.log(first)
        this.city.index = first[0][0].toUpperCase()
      }
    }
  },
  components: {  }
}
</script>

