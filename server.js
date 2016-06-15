var express = require('express')

var app = express()
app.use(express.static('public'))

console.log('Server running at localhost:8080...Ctrl+C to exit.')
app.listen(process.env.PORT || 8080)
