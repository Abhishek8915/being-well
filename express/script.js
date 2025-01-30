const express = require('express')
const app = express()

app.use(function (req, res, next) {
  console.log('middleware runs , Time:', Date.now())
  next()
})

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/profile', function (req, res) {
  res.send('Profile name : abhishek makwana gondal gj3')
})

app.use((err,req,res,next)=>{
  console.error(err.stack)
  res.status(500).send('Something broke!')  
})

app.listen(3000)
