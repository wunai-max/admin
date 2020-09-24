<template>
  <div class="app-container">
    <el-row>
      <el-col :span="12">
        <el-upload
          class="avatar-uploader"
          action="upp"
          :show-file-list="false"
          :http-request="UploadImage"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img
            v-if="imageUrl"
            :src="imageUrl"
            class="avatar"
            style="width: 100px; height: 100px"
          >
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form ref="form" label-width="80px">
          <el-form-item label="电影名称">
            <el-input v-model="movie.title" />
          </el-form-item>
          <el-form-item label="演员">
            <el-input v-model="movie.stars" />
          </el-form-item>
          <el-form-item label="选择城市">
            <el-select v-model="movie.region" placeholder="请选择活动区域">
              <el-option
                v-for="item in list"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="评分">
            <el-input v-model="movie.score" />
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="movie.desc" />
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
  components: {},
  data() {
    return {
      movie: {
        title: '',
        stars: '',
        region: '',
        score: '',
        desc: ''
      },
      list: [],
      imageUrl: ''
    }
  },
  created() {
    this.getCitys()
  },
  methods: {
    // 重置
    cancel() {
      this.movie.title = ''
      this.movie.stars = ''
      this.movie.region = ''
      this.movie.score = ''
      this.movie.desc = ''
    },
    getCitys() {
      axios.get('/cityss').then((res) => {
        this.list = res.data.list
      })
    },
    // 图片上传
    UploadImage(param) {
      console.log(param) // file
      const uploadData = new FormData()
      uploadData.append('avatar', param.file) // 上传图片的接口  传上去后让后台返回一个地址
      axios.post('/upload', uploadData).then(res => {
        this.imageUrl = res.data.path
      })
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    // 提交添加
    onSubmit() {
      axios.post('/movie/create', {
        title: this.movie.title,
        imgurl: this.imageUrl,
        stars: this.movie.stars,
        score: this.movie.score,
        desc: this.movie.desc,
        p: this.movie.region
      }).then(res => {
        if (res.data.code === 20000) {
          this.$message({
            message: res.data.msg,
            type: 'success'
          })
          this.$router.push({
            path: '/movie/list'
          })
        }
      })
    }
  }
}
</script>
<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

