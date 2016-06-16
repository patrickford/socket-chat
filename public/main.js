$(document).ready(function () {
  //  connect to server
  var socket = io()
  var chat = $('#chat')
  var messages = $('#messages')
  var users_count = $('#users-count')
  var nickname = $('#nickname')

  var addMessage = function (message) {
    messages.append('<div>' + message + '</div>')
  }

  var countUsers = function (count) {
    users_count.html('<h3>Users online:&nbsp; <span class="badge">' + count + '</span></h3>')
  }

  chat.on('keydown', function (event) {
    if (event.keyCode !== 13) {
      return
    }
    var user = nickname.val() === '' ? 'Anonymous' : nickname.val()
    socket.emit('user-name', user)

    var message = user + ': ' + chat.val()
    addMessage(message)
    socket.emit('message', message)
    chat.val('')
  })
  //  get broadcast from server when others send data
  socket.on('message', addMessage)
  socket.on('users_count', countUsers)
})
