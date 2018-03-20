var WolfGame = require('../models/WolfGame.model')
var GameCode = require('../models/GameCode.model')
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
			return this.server.socket.emit('gameError', {message: 'Couldn\'t find game', error: 'NO_GAME'})
		}
		if (this.server.game.players.length >= this.server.game.maxPlayers) {
			return this.server.socket.emit('gameError', {message: 'Cannot join game, too many players', error: 'TOO_MANY_PLAYERS'})
		}
		if (this.server.game.state !== 'SETUP') {
			return this.server.socket.emit('gameError', {message: 'Game has already started', error: 'GAME_STARTED'})
		}
		if (data.player.length < 2) {
			return this.server.socket.emit('gameError', {message: 'Name can\'t be at least 2 characters', error: 'INVALID_INPUT'})
		}
		if (data.player.length > 20) {
			return this.server.socket.emit('gameError', {message: 'Name can\'t be longer than 20 characters', error: 'INVALID_INPUT'})
		}
		if (this.server.game.getPlayerByName(data.player)) {
			return this.server.socket.emit('gameError', {message: 'Choose a different name', error: 'INVALID_INPUT'})
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
		let length = 4
		do {
			this.server.game.code = new GameCode(length++)
		} while (typeof this.server.games[this.server.game.code] !== 'undefined')
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
