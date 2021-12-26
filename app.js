import Express from "express";
import router from './api/index.js'
import cookieParser from 'cookie-parser'
const app = Express()
app.use(Express.static('public'))
app.use(cookieParser())
app.all('*', (req, res, next) => {
  // google需要配置，否则报错cors error
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  // 允许的地址,http://127.0.0.1:9000这样的格式
  res.setHeader('Access-Control-Allow-Origin', req.get('Origin'))
  // 允许跨域请求的方法
  res.setHeader(
    'Access-Control-Allow-Methods',
    'POST, GET, OPTIONS, DELETE, PUT'
  )
  // 允许跨域请求header携带哪些东西
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, If-Modified-Since'
  )
  next()
})
app.use('/api', router)
app.listen(9999)