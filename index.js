var express = require('express')
var app = express()
var bodyParser = require('body-parser')
const path = require('path')
const fs = require('fs')

var users = {}

app.use(express.static('public'))

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.post('/register', bodyParser.json(), function (req, res) {
  console.log(req.body)
  if (!req.body.email || !req.body.pass) {
    return res.send({ok: false, msg: 'email or pass empty'})
  }
  users[req.body.email] = req.body.pass
  res.send({
    ok: true,
    msg: 'Register Successful',
  })
})
app.post('/login', bodyParser.json(), function (req, res) {
  console.log(req.body)
  if (!users[req.body.email]
    || users[req.body.email] !== req.body.pass) {
    return res.send({ok: false, msg: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง'})
  }
  res.send({
    ok: true,
    msg: 'เข้าสู่ระบบเรียบร้อย',
  })
})
app.get('/students/:num?', (req, res) => {
  console.log(req.params)
  let num = parseInt(req.params.num || 10)
  num = Math.max(1, Math.min(100, isNaN(num) ? 10 : num))
  let students = []
  for (let i = 0; i < num; i++) {
    students.push({
      code: ('000' + (i + 1)).substr(-4),
      name: 'Student' + (i + 1),
      gpa: parseFloat(Math.min(4, Math.max(1.5, Math.random() * 4.5)).toFixed(2))
    })
  }
  res.send({
    ok: true,
    students,
  })
})

app.post('/upload', (req, res) => {
  req.pipe(fs.createWriteStream(path.resolve('./public', req.headers['x-code'] + ".jpg"), {
    flags: 'w',
    encoding: null,
    fd: null,
    mode: 0666
  })).on('finish', () => {
    console.log('upload done', req.headers['x-code'])
    res.send({status: true})
  })
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
