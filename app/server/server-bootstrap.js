var WolfGame = require('../common/models/wolf-game.model')
var Player = require('../common/models/player.model')
var express = require('express')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)

// Socket.io Test
let i = 0
let connected = false
let games = {}

io.on('connection', (socket) => {
	
	console.log('a user connected')
	connected = true

	socket.on('disconnect', (reason) => {
		console.log('a user disconnected')
		connected = false
	})

	socket.on('createGame', () => {
		let game = new WolfGame()
		games[game.code] = game
		console.clear()
		console.log(games)
	})

	socket.on('joinGame', data => {
		games[data.game.toUpperCase()].players.push(new Player({name: data.name}))
		console.clear()
		console.log(games)
	})

})

http.listen(3000, () => {
	console.log('listening on *:3000')
})
app.use(express.static('public'))
