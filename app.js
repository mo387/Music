import Express from "express";
const app = Express()
app.use(Express.static('public'))
app.all('*', function (req, res, next) {

  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With,yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  if (req.method == 'OPTIONS') {
    res.send(200);
  }
  else {
    next();
  }
});
app.get('/api', (req, res) => {
  console.log('被请求')
  res.send('hello world')
})
app.listen(9999)