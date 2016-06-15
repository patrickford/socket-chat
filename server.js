var express = require('express')
var socket_io = require('socket.io')
var http = require('http')

var app = express()
app.use(express.static('public'))

var server = http.Server(app)
var io = socket_io(server)

io.on('connection', function (socket) {
  console.log('Client connected.')

  socket.on('message', function (message) {
    // print out received data
    console.log('Received message: ', message)
    // broadcast to users
    socket.broadcast.emit('message', message)
  })
})

console.log('Server running at localhost:8080...Ctrl+C to exit.')
server.listen(process.env.PORT || 8080)
