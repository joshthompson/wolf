var WolfGame = require('./models/wolf-game.model')
var RoomCode = require('./models/room-code.model')
var Player = require('./models/player.model')

class WolfGameServer {

	constructor(socket, games) {
		// Data
		this.socket = socket
		this.games = games
		this.mode = null
		this.game = null
		this.player = null
		this.setupSocket()
		// Settings
		this.inactiveGameTimeout = 60 * 1000
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
		// Player Setup
		this.socket.on('changeName', (...args) => this.changeName(...args))
		this.socket.on('selectAvatar', (...args) => this.selectAvatar(...args))
		// Player Intro
		this.socket.on('playerReady', (...args) => this.playerReady(...args))
		// Voting
		this.socket.on('vote', (...args) => this.vote(...args))
		this.socket.on('accuse', (...args) => this.accuse(...args))
		this.socket.on('withdrawAccusation', (...args) => this.withdrawAccusation(...args))
		// Special
		this.socket.on('requestStats', (...args) => this.requestStats(...args))
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
			}, this.inactiveGameTimeout)
		}
	}

	createGame() {
		this.game = new WolfGame({
			socket: this.socket,
			state: 'SETUP'
		})
		while (typeof this.games[this.game.code] !== 'undefined') {
			// Prepare for very unlikely chance we have more room than codes
			let length = Math.max(4, Math.log(Object.keys(this.games).length * 2) * Math.LOG10E + 1)
			this.game.code = RoomCode.generate(length)
		}
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

		if (!this.game) {
			return this.socket.emit('gameError', {message: 'Couldn\'t find game'})
		}
		
		this.game.setState('INTRO')
		this.socket.emit('setTimeTarget', {time: 22, timestamp: new Date().getTime() + 800})
		this.game.setupPlayerIdentities()
		this.game.update()
	}

	playerReady() {
		if (!this.game) {
			return this.socket.emit('gameError', {message: 'Couldn\'t find game'})
		}
		if (!this.player) {
			return this.socket.emit('gameError', {message: 'Couldn\'t find player'})
		}
		this.player.setState('READY')
		if (this.game.checkPlayersState('READY')) {
			this.game.setState('NIGHT')
			this.socket.emit('setTimeTarget', {time: 0, timestamp: new Date().getTime() + 800})
		}
		this.game.update()
	}

	changeName(name) {
		if (!this.game) {
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

	requestStats() {
		let games = Object.keys(this.games) 
		let players = games.map(game => this.games[game].players.length).reduce((a, b) => a + b, 0)
		this.socket.emit('stats', {
			activeGames: games.length,
			activePlayers: players
		})
	}

	vote(player) {
		if (!this.game) {
			return this.socket.emit('gameError', {message: 'Couldn\'t find game'})
		}
	}

	accuse(player) {
		if (!this.game) {
			return this.socket.emit('gameError', {message: 'Couldn\'t find game'})
		}
	}

	withdrawAccusation() {
		if (!this.game) {
			return this.socket.emit('gameError', {message: 'Couldn\'t find game'})
		}
	}


}

module.exports = WolfGameServer
