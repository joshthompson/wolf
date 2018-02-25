var WolfGame = require('../common/models/wolf-game.model')
var Player = require('../common/models/player.model')
var express = require('express')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)

// Socket.io Test
let i = 0
let games = {}

io.on('connection', (socket) => {
	
	console.log('a user connected')

	let game = null;
	let player = null;

	socket.on('disconnect', (reason) => {
		console.log('a user disconnected')
	})

	socket.on('createGame', () => {
		game = new WolfGame({
			host: socket,
			state: 'SETUP'
		})
		games[game.code] = game
		socket.emit('gameCreated', {game: game.toPrivateJSON()})
		console.log(`game created: ${game.code}`)
	})

	socket.on('recoverGame', data => {
		game = games[data.code]
		if (game) {
			if (game.token === data.token) {
				game.host = socket
				return socket.emit('recoverGame', {game: game.toPrivateJSON()})
			}
			let players = game.players.filter(player => player.token === data.token)
			if (players[0]) {
				player = players[0]
				player.socket = socket
				return socket.emit('recoverGame', {game: game.toPublicJSON(), player: player.toPrivateJSON()})
			}
		}
	})

	socket.on('endGame', data => {
		if (!game) {
			return socket.emit('gameError', {message: 'Couldn\'t find game'})
		}
		game.end()
		delete games[game.code]
		delete game
	})

	socket.on('joinGame', data => {
		game = games[data.game.toUpperCase()]
		
		if (!game) {
			return socket.emit('gameError', {message: 'Couldn\'t find game'})
		}

		if (data.player.length < 2) {
			return socket.emit('gameError', {message: 'Name can\'t be at least 2 characters'})
		}

		if (data.player.length > 20) {
			return socket.emit('gameError', {message: 'Name can\'t be longer than 20 characters'})
		}

		if (game.findPlayerByName(data.player)) {
			return socket.emit('gameError', {message: 'Choose a different name'})
		}

		player = new Player({
			name: data.player,
			game: game,
			state: 'SELECT_AVATAR',
			socket: socket
		})
		game.addPlayer(player)
		socket.emit('gameJoined', {game: game.toPublicJSON(), player: player.toPrivateJSON()})
	})

	socket.on('startGame', () => {
		game.state = 'READY'
		game.setupPlayerIdentities()
		game.update()
	})

	socket.on('changeName', name => {
		if (!game) {
			return socket.emit('gameError', {message: 'Couldn\'t find game'})
		}
		if (!player) {
			return socket.emit('gameError', {message: 'Couldn\'t find player'})
		}
		if (name.length < 2) {
			return socket.emit('gameError', {message: 'Name can\'t be at least 2 characters'})
		}

		if (name.length > 20) {
			return socket.emit('gameError', {message: 'Name can\'t be longer than 20 characters'})
		}
		player.setName(name)
		game.update()
	})

	socket.on('selectAvatar', avatar => {
		if (!game) {
			return socket.emit('gameError', {message: 'Couldn\'t find game'})
		}
		if (!player) {
			return socket.emit('gameError', {message: 'Couldn\'t find player'})
		}
		if (game.players.filter(player => player.avatar === avatar).length) {
			return socket.emit('gameError', {message: 'Please select a different avatar'})
		}
		player.setAvatar(avatar)
		player.setState('READY')
		game.update()
	})

})

http.listen(3000, () => {
	console.log('\033c')
	console.log(`
 ,ggg,      gg      ,gg
dP""Y8a     88     ,8P             ,dPYb, ,dPYb, 
Yb, \`88     88     d8'             IP'\`Yb IP'\`Y
 \`"  88     88     88              I8  8I I8  8I
     88     88     88              I8  8' I8  8'
     88     88     88    ,ggggg,   I8 dP  I8 dP
     88     88     88   dP"  "Y8gggI8dP   I8dP
     Y8    ,88,    8P  i8'    ,8I  I8P    I8P
      Yb,,d8""8b,,dP  ,d8,   ,d8' ,d8b,_ ,d8b,_
       "88"    "88"   P"Y8888P"   8P'"Y88PI8"8888
                                          I8 \`8,
    Created by Josh Thompson              I8  \`8,
    Copyright 2018                        I8   8I
    github.com/joshthompson/wolf          I8   8I
                                          I8, ,8'
    listening on *:3000                    "Y8P'
`)
})
app.use(express.static('public'))
