var WolfGame = require('./wolf-game.model')
var sha512 = require('js-sha512').sha512

class Player {
	constructor(data) {
		// Player Data
		this.id
		this.name
		this.avatar
		this.character = 'VILLAGER' // 'VILLAGER' | 'WEREWOLF'
		this.alive = true
		this.token = null
		this.game = null
		this.socket = null

		// Generic object
		data = typeof data === 'string' ? {name} : (typeof data === 'object' ? data : {})
		// Set ID
		if (typeof data.id === 'number') this.id = data.id
		// Set Name
		if (typeof data.name === 'string') this.name = data.name
		// Set Avatar
		if (typeof data.avatar === 'string') this.avatar = data.avatar
		// Set Character
		if (typeof data.character === 'string') this.character = data.character
		// Set Alive
		if (typeof data.alive === 'boolean') this.alive = data.alive
		// Set Character
		if (typeof data.token === 'string') this.token = data.token
		else this.token = this.createToken()
		// Set Game
		if (data.game /* instanceof WolfGame */) this.game = data.game
		// Set Socket
		if (data.socket) this.socket = data.socket
	}

	createToken() {
		return sha512(`wolf-game-${new Date()}-${Math.random()}`)
	}

	updateGame() {
		this.socket.emit('updateGame', {game: this.game})
	}

	toJSON() {
		return {
			id: this.id,
			name: this.name,
			avatar: this.avatar,
			character: this.character,
			alive: this.alive,
			token: this.token
		}
	}
}

module.exports = Player
