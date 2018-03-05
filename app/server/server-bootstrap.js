var WolfGameServer = require('./wolf-game-server')
var express = require('express')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)

let games = {} // Stores all active games mapped to the room code
io.on('connection', (socket) => new WolfGameServer(socket, games))

let port = process.env.PORT || 9653

http.listen(port, () => {
	console.log('\033c')
	console.log(`
 ,ggg,      gg      ,gg
dP""Y8a     88     ,8P             ,dPYb, ,dPYb, 
Yb, '88     88     d8'             IP''Yb IP''Y
 '  88     88     88              I8  8I I8  8I
     88     88     88              I8  8' I8  8'
     88     88     88    ,ggggg,   I8 dP  I8 dP
     88     88     88   dP"  "Y8gggI8dP   I8dP
     Y8    ,88,    8P  i8'    ,8I  I8P    I8P
      Yb,,d8""8b,,d8, ,d8,   ,d8' ,d8b,_ ,d8b,_
       "88"    "88"'P88P"Y8888P"   8P'"Y88PI8"8888
                                          I8 '8,
     Created by Josh Thompson             I8  '8,
     Copyright 2018                       I8   8I
     github.com/joshthompson/wolf         I8   8I
                                          I8, ,8'
     listening on *:${port}                   "Y8P'
`)
})
app.use(express.static('public'))
