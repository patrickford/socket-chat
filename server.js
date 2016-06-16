var express = require('express')
var socket_io = require('socket.io')
var http = require('http')

var app = express()
app.use(express.static('public'))

var server = http.Server(app)
var io = socket_io(server)

var users = {
  count: 0
}

io.on('connection', function (socket) {
  users.count++
  socket.broadcast.emit('message', 'Client ' + users.count + ' connected.')
  io.emit('users_count', users.count)

  socket.on('user-name', function (name) {
    socket.username = name
  })

  socket.on('disconnect', function () {
    var username = socket.username === undefined ? 'Anonymous' : socket.username
    var message = username + ' left the chat room.'
    users.count--
    socket.broadcast.emit('message', message)
    io.emit('users_count', users.count)
  })

  socket.on('message', function (message) {
    // broadcast to users
    socket.broadcast.emit('message', message)
  })
})

console.log('Server running at localhost:8080...Ctrl+C to exit.')
server.listen(process.env.PORT || 8080)
