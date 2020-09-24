const express = require('express')
const app = new express()
const City = require('./model/city')
const Movie = require('./model/movie')
var bodyParser = require('body-parser')
var multer  = require('multer')//上传图片的插件

//图片接收
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')   //使用uploads文件存放图片
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now()+file.originalname)
  }
})
var upload = multer({ storage: storage })

// 静态托管
app.use('/uploads', express.static('uploads'))

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())




app.post('/user/login', function (req, res) {
  // req.session.token='加密算法生成随机token'
  // const data={"code":20000,"data":{"roles":["editor"],"token":req.session.token,"introduction":"I am a super administrator","avatar":"https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif","name":"Super Admin"}}
  const data = {
    "code": 20000,
    "data": {
      "token": "asasasasas",
      "orangiseid": 'wwwwwwww',
      "introduction": "I am a super administrator",
      "avatar": "https://dgss0.bdstatic.com/5bVWsj_p_tVS5dKfpU_Y_D3/res/r/image/2020-09-22/7afe3efb3e8fb391539e4e821e9ece28.jpg", "name": "Super Admin"
    }
  }
  res.json(data)
})
app.get('/user/info', function (req, res) {
  const data = {
    "code": 20000,
    "data": {
      "roles": ["admin"],
      "introduction": "I am a super administrator",
      "avatar": "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif", "name": "Super Admin"
    }
  }
  res.json(data)
})
app.post('/user/logout', function (req, res) {
  res.json({ "code": 20000, "message": "success" })
})


// 添加城市
app.post('/city/create', (req, res) => {
  console.log(req.body)
  const city = new City(req.body)
  city.save().then(mon => {
    if(mon) {
      res.json({
        code: 20000,
        msg: '城市添加成功'
      })
    }
  })
})
//movie页面获取全部城市列表
app.get('/cityss', (req, res) => {
  City.find().then(mon => {
    if(mon.length > 0){
      res.json({
        code: 20000,
        list: mon
      })
    }
  })
})

// 分页获取城市列表
app.get('/citys', async (req, res) => {
  const page = req.query.page || 1
  const pagesize = req.query.pagesize || 3
  const start = (Number(page)-1) * Number(pagesize)   // 从哪个地方开始查起
  const nums = Number(pagesize)   // 查几条
  const total = await City.find()
  const result = await City.find().skip(start).limit(nums)
  res.json({
    code: 20000,
    list: result,
    total: total.length
  })
  // City.find().then(mon => {
  //   if(mon.length > 0){
  //     res.json({
  //       code: 20000,
  //       list: mon
  //     })
  //   }
  // })
})

// 获取编辑城市信息
app.get('/city/:id', (req, res) => {
  City.findById(req.params.id).then(mon => {
    if(mon) {
      res.json({
        code: 20000,
        data: mon
      })
    }
  })
})
// 修改城市信息
app.put('/city/edit/:id', (req, res) => {
  console.log(1111, req.params.id)
  City.findByIdAndUpdate(req.params.id, req.body).then(mon => {
    if(mon) {
      res.json({
        code: 20000,
        msg: '数据修改成功'
      })
    }
  })
})


// 删除城市 
app.delete('/delcity/:id', (req, res) => {
  console.log(req.params.id)
  City.findByIdAndDelete(req.params.id).then(mon => {
    if(mon) {
      // console.log(mon)
      res.json({
        code: 20000,
        msg: '删除成功'
      })
    }
  })
})

//添加电影
app.post("/movie/create",(req,res)=>{
  // console.log(req.body)
  const movie=new Movie(req.body)
  movie.save(req.body).then(mon=>{
    res.json({
      code:20000,
      msg:"数据添加成功"
    })
  })
})
//获取电影列表
app.get('/movies', async (req, res) => {
  const page = req.query.page || 1
  const pagesize = req.query.pagesize || 3
  const start = (Number(page)-1) * Number(pagesize)   // 从哪个地方开始查起
  const nums = Number(pagesize)   // 查几条
  const total = await Movie.find()
  const result = await Movie.find().populate("p").skip(start).limit(nums)
    // console.log(result);
    res.json({
    code: 20000,
    list: result,
    total: total.length
    })

  })

 //删除电影
 app.delete("/delmovie/:id",(req,res)=>{
  //  console.log(req.params.id);
   Movie.findByIdAndDelete(req.params.id).then(mon => {
    if(mon) {
      // console.log(mon)
      res.json({
        code: 20000,
        msg: '删除成功'
      })
    }
  })
 })
//修改电影
app.get("/getmovie/:id",(req,res)=>{
  // console.log(req.params.id)
  Movie.findById(req.params.id).populate("p").then(mon=>{
    res.json({
      code:20000,
      movie:mon

    })
  })
})
app.get('/getcity', (req, res) => {
  City.find().then(mon => {
    if(mon.length > 0){
      res.json({
        code: 20000,
        list: mon
      })
    }
  })
})
app.put("/movie/updata/:id",(req,res)=>{
        var uid=req.params.id
        // console.log(req.body)
   Movie.findByIdAndUpdate(uid,req.body).then(mon=>{
     res.json({
       code:20000,
       msg:"数据修改成功"

     })
   })
})










// 图片上传组件
app.post('/upload', upload.single('avatar'), function (req, res, next) {
  res.json({
    code: 20000,
    msg: '图片上传成功',
    path: req.file.path
  })

})


app.listen(8888, '127.0.0.1')
