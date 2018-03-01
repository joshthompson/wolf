var WolfGame = require('./wolf-game.model')
var sha512 = require('js-sha512').sha512

class Player {
	constructor(data) {
		// Player Data
		this.name = null
		this.avatar = null
		this.character = null
		this.alive = true
		this.state = null
		this.token = null
		this.data = {}
		this.game = null
		this.socket = null

		// Generic object
		data = typeof data === 'string' ? {name: data} : (typeof data === 'object' ? data : {})
		// Set Name
		if (typeof data.name === 'string') this.name = data.name
		// Set Avatar
		if (typeof data.avatar === 'string') this.avatar = data.avatar
		// Set Character
		if (typeof data.character === 'string') this.character = data.character
		// Set Alive
		if (typeof data.alive === 'boolean') this.alive = data.alive
		// Set State
		if (typeof data.state === 'string') this.state = data.state
		// Set Character
		if (typeof data.token === 'string') this.token = data.token
		else this.token = this.createToken()
		// Set Data
		if (typeof data.data === 'object') this.data = data.data
		// Set Game
		if (data.game /* instanceof WolfGame */) this.game = data.game
		// Set Socket
		if (data.socket) this.socket = data.socket
	}

	createToken() {
		return sha512(`wolf-game-${new Date()}-${Math.random()}`)
	}

	update() {
		this.socket.emit('updatePlayer', this.toPrivateJSON())
	}

	updateGame() {
		this.socket.emit('updateGame', this.game.toPublicJSON())
	}

	setName(name) {
		this.name = name
		this.update()
	}

	setAvatar(avatar) {
		this.avatar = avatar
	}

	setCharacter(character) {
		this.character = character
	}

	setState(state) {
		this.state = state
	}

	toPrivateJSON() {
		return {
			name: this.name,
			avatar: this.avatar,
			character: this.character,
			alive: this.alive,
			state: this.state,
			token: this.token
		}
	}

	toPublicJSON() {
		return {
			name: this.name,
			avatar: this.avatar,
			alive: this.alive,
			state: this.state
		}
	}
}

module.exports = Player
