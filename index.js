var express = require('express')
var app = express()
var bodyParser = require('body-parser')

var users = {}
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
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
