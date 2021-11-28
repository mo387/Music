import Express from "express";
const app = Express()
app.use(Express.static('public'))
app.get('/', (req, res) => {
  res.send('hello world')
})
app.listen(8080)