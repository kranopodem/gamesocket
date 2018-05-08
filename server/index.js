'use strict'

const chalk = require('chalk')
const express = require('express')
const http = require('http')
const socketServer = require('socket.io')
const app = express()

//app.use('/', express.static('dist'))

let serve = http.createServer(app)
let io = socketServer(serve)
var guessNumber = Math.floor(1000 + Math.random() * 9000)
let rooms = []
var userExist=false
serve.listen(process.env.PORT || 5000, () => {
  console.log('Socket Server running on port:' + (process.env.PORT || 5000))
})

let connections = []
let loadedUsers = {}
const removeLoadedUser = socketID => {
  let userIDS = Object.keys(loadedUsers)
  for (let u of userIDS) {
    if (loadedUsers[u].socket === socketID) {
      delete loadedUsers[u]
    }
  }
}

const setProgress = (socket, time) => {
  let i = 0
  setInterval(function () {
    i = i + 1.666666666666666667;
    socket.emit('tickTimer', i);
    if (i >= 100) i = 0
  }, Math.round(time * 16.6))
}

const tryGuess = (number) => {
  if (guessNumber == number)
    console.log('Угадал')
  else if (guessNumber > number)
    console.log('Больше')
  else if (guessNumber < number)
    console.log('Меньше')
}

io.on('connection', socket => {
  console.log(chalk.green(`Socket ID ${socket.id} has connected. Guess number ${guessNumber}`))
  connections.push(socket.id)
  setProgress(socket, 60);

  socket.on('tryGuess', (number) => {
    tryGuess(number);
  })

  socket.on('disconnect', () => {
    console.log(chalk.yellow(`Socket ID ${socket.id} has disconnected.`))
    connections = connections.filter(s => {
      return socket.id !== s
    })
  })

  socket.on('createRoom', (room, username) => {
    rooms.push({
      'id': room,
      'users': [{
        'id': socket.id,
        'name': username,
        'role': 'admin'
      }]
    });
    var selectRoom = rooms.find(selectRoom=>selectRoom.id==room)
    //Заносим ID комнаты в массив всех комнат
    socket.join(room); //Соединяем создателя с комнатой
    socket.username = username;
    console.log(selectRoom);
    console.log(username);
    io.sockets.in(room).emit('message', selectRoom.users);
    console.log(chalk.red(`Socket ID ${socket.id} has created room ${room}`))
  })

  socket.on('joinRoom', (roomNumber, username) => {
    rooms.forEach(function (room) {
      if (room.id == roomNumber) {
        var selectRoom = rooms.find(selectRoom=>selectRoom.id==roomNumber)
        room.users.forEach(function(user){
          console.log(user.id+' - '+socket.id+' - '+user.name)
          if ((user.id == socket.id)||(user.name == username)) {
            userExist = true;
          } 
        })
        if(!userExist){
          room.users.push({
            'id': socket.id,
            'name': username,
            'role': 'user'
          })
          console.log(room.users[0].id)
          socket.join(roomNumber)
          socket.username = username;
          io.sockets.in(roomNumber).emit('message', selectRoom.users)
          console.log(chalk.red(`Socket ID ${socket.id} has created room ${roomNumber}`))
        }else{
          console.log('хуй')
          socket.emit('errors','Такой пользователь уже есть')
          userExist=false
        }
      }
    })
  })
})
