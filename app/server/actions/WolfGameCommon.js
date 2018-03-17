var WolfGame = require('../models/WolfGame.model')
var RoomCode = require('../models/RoomCode.model')
var Player = require('../models/Player.model')

class WolfGameCommon {

	constructor(server) {
		this.server = server
	}

	disconnect(reason) {
		if (this.server.game && !this.server.game.activeSockets()) {
			setTimeout(() => {
				if (!this.server.game.activeSockets()) {
					// Remove inactive game
					this.server.game.end()
					delete this.server.games[this.server.game.code]
					delete this.server.game
				}
			}, this.server.inactiveGameTimeout)
		}
	}

	recoverGame(data) {
		this.server.game = this.server.games[data.code]
		if (this.server.game) {
			if (this.server.game.token === data.token) {
				this.server.game.socket = this.server.socket
				return this.server.socket.emit('recoverGame', {game: this.server.game.toPrivateJSON()})
			}
			let players = this.server.game.players.filter(player => player.token === data.token)
			if (players[0]) {
				this.server.player = players[0]
				this.server.player.socket = this.server.socket
				return this.server.socket.emit('recoverGame', {
					game: this.server.game.toPublicJSON(),
					player: this.server.player.toPrivateJSON()
				})
			}
		}
	}

	joinGame(data) {
		this.server.game = this.server.games[data.game.toUpperCase()]
		if (!this.server.game) {
			return this.server.socket.emit('gameError', {message: 'Couldn\'t find game'})
		}
		if (this.server.game.players.length >= this.server.game.maxPlayers) {
			return this.server.socket.emit('gameError', {message: 'Cannot join game, too many players'})
		}
		if (this.server.game.state !== 'SETUP') {
			return this.server.socket.emit('gameError', {message: 'Game has already started'})
		}
		if (data.player.length < 2) {
			return this.server.socket.emit('gameError', {message: 'Name can\'t be at least 2 characters'})
		}
		if (data.player.length > 20) {
			return this.server.socket.emit('gameError', {message: 'Name can\'t be longer than 20 characters'})
		}
		if (this.server.game.findPlayerByName(data.player)) {
			return this.server.socket.emit('gameError', {message: 'Choose a different name'})
		}
		this.server.player = new Player({
			name: data.player,
			game: this.server.game,
			state: 'SELECT_AVATAR',
			socket: this.server.socket
		})
		this.server.game.addPlayer(this.server.player)
		this.server.socket.emit('gameJoined', {game: this.server.game.toPublicJSON(), player: this.server.player.toPrivateJSON()})
	}

	createGame() {
		this.server.game = new WolfGame({
			socket: this.server.socket,
			state: 'SETUP'
		})
		while (typeof this.server.games[this.server.game.code] !== 'undefined') {
			// Prepare for very unlikely chance we have more room than codes
			let length = Math.max(4, Math.log(Object.keys(this.server.games).length * 2) * Math.LOG10E + 1)
			this.server.game.code = RoomCode.generate(length)
		}
		this.server.games[this.server.game.code] = this.server.game
		this.server.socket.emit('gameCreated', {game: this.server.game.toPrivateJSON()})
		console.log(`Game created: ${this.server.game.code}`)
	}

	requestStats() {
		let games = Object.keys(this.server.games) 
		let players = games.map(game => this.server.games[game].players.length).reduce((a, b) => a + b, 0)
		this.server.socket.emit('stats', {
			activeGames: games.length,
			activePlayers: players
		})
	}


}

module.exports = WolfGameCommon
