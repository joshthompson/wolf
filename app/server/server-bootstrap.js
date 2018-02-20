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
		let game = new WolfGame({host: socket})
		games[game.code] = game
		socket.emit('gameCreated', {game: game.toJSON()})
		console.log(`game created: ${game.code}`)
	})

	socket.on('joinGame', data => {
		let game = games[data.game.toUpperCase()]
		if (game) {
			let player = new Player({
				name: data.player,
				game: game,
				socket: socket
			})
			console.log(player.toJSON())
			game.addPlayer(player)
			socket.emit('gameJoined', {player: player.toJSON()})
			console.log('game join: success')
		} else {
			socket.emit('gameJoinFail', {message: 'Couldn\'t find game'})
			console.log('game join: fail')
		}
	})

})

http.listen(3000, () => {
	console.log('listening on *:3000')
})
app.use(express.static('public'))
