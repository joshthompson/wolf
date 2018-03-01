var WolfGame = require('./models/wolf-game.model')
var Player = require('./models/player.model')

class WolfGameServer {

	constructor(socket, games) {
		this.socket = socket
		this.games = games
		this.mode = null
		this.game = null
		this.player = null
		this.setupSocket()
	}

	setupSocket() {
		// Common
		this.socket.on('disconnect', (...args) => this.disconnect(...args))
		this.socket.on('recoverGame', (...args) => this.recoverGame(...args))
		// New connection
		this.socket.on('joinGame', (...args) => this.joinGame(...args))
		this.socket.on('createGame', (...args) => this.createGame(...args))
		// Host
		this.socket.on('startGame', (...args) => this.startGame(...args))
		this.socket.on('endGame', (...args) => this.endGame(...args))
		// Player
		this.socket.on('changeName', (...args) => this.changeName(...args))
		this.socket.on('selectAvatar', (...args) => this.selectAvatar(...args))
	}

	disconnect(reason) {
		if (this.game && !this.game.activeSockets()) {
			setTimeout(() => {
				if (!this.game.activeSockets()) {
					// Remove inactive game
					this.game.end()
					delete this.games[this.game.code]
					delete this.game
				}
			}, 3 * 1000)
		}
	}

	createGame() {
		this.game = new WolfGame({
			socket: this.socket,
			state: 'SETUP'
		})
		this.games[this.game.code] = this.game
		this.socket.emit('gameCreated', {game: this.game.toPrivateJSON()})
		console.log(`Game created: ${this.game.code}`)
	}

	recoverGame(data) {
		this.game = this.games[data.code]
		if (this.game) {
			if (this.game.token === data.token) {
				this.game.socket = this.socket
				return this.socket.emit('recoverGame', {game: this.game.toPrivateJSON()})
			}
			let players = this.game.players.filter(player => player.token === data.token)
			if (players[0]) {
				this.player = players[0]
				this.player.socket = this.socket
				return this.socket.emit('recoverGame', {
					game: this.game.toPublicJSON(),
					player: this.player.toPrivateJSON()
				})
			}
		}
	}

	endGame(data) {
		if (!this.game) {
			return this.socket.emit('gameError', {message: 'Couldn\'t find game'})
		}
		this.game.end()
		delete this.games[this.game.code]
		delete this //this.game
	}

	joinGame(data) {
		this.game = this.games[data.game.toUpperCase()]
		
		if (!this.game) {
			return this.socket.emit('gameError', {message: 'Couldn\'t find game'})
		}

		if (data.player.length < 2) {
			return this.socket.emit('gameError', {message: 'Name can\'t be at least 2 characters'})
		}

		if (data.player.length > 20) {
			return this.socket.emit('gameError', {message: 'Name can\'t be longer than 20 characters'})
		}

		if (this.game.findPlayerByName(data.player)) {
			return this.socket.emit('gameError', {message: 'Choose a different name'})
		}

		this.player = new Player({
			name: data.player,
			game: this.game,
			state: 'SELECT_AVATAR',
			socket: this.socket
		})
		this.game.addPlayer(this.player)
		this.socket.emit('gameJoined', {game: this.game.toPublicJSON(), player: this.player.toPrivateJSON()})
	}

	startGame() {
		this.game.setState('INTRO')
		this.game.setupPlayerIdentities()
		this.game.update()
	}

	playerReady() {
		this.player.setState('READY')
		if (this.game.checkPlayersState('READY')) {
			this.game.setState('NIGHT')
		}
		this.game.update()
	}

	changeName(name) {
		if (!thiis.game) {
			return this.socket.emit('gameError', {message: 'Couldn\'t find game'})
		}
		if (!this.player) {
			return this.socket.emit('gameError', {message: 'Couldn\'t find player'})
		}
		if (name.length < 2) {
			return this.socket.emit('gameError', {message: 'Name can\'t be at least 2 characters'})
		}

		if (name.length > 20) {
			return this.socket.emit('gameError', {message: 'Name can\'t be longer than 20 characters'})
		}
		this.player.setName(name)
		this.game.update()
	}

	selectAvatar(avatar) {
		if (!this.game) {
			return this.socket.emit('gameError', {message: 'Couldn\'t find game'})
		}
		if (!this.player) {
			return this.socket.emit('gameError', {message: 'Couldn\'t find player'})
		}
		if (this.game.players.filter(player => this.player.avatar === avatar).length) {
			return this.socket.emit('gameError', {message: 'Please select a different avatar'})
		}
		this.player.setAvatar(avatar)
		this.player.setState('READY')
		this.game.update()
	}

}

module.exports = WolfGameServer
