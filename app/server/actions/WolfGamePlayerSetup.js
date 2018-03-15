class WolfGamePlayerSetup {

	constructor(server) {
		this.server = server
	}

	changeName(name) {
		if (name.length < 2) {
			return this.server.socket.emit('gameError', {message: 'Name can\'t be at least 2 characters'})
		}
		if (name.length > 20) {
			return this.server.socket.emit('gameError', {message: 'Name can\'t be longer than 20 characters'})
		}
		this.server.player.setName(name)
		this.server.game.update()
	}

	selectAvatar(avatar) {
		if (this.server.game.players.filter(player => this.server.player.avatar === avatar).length) {
			return this.server.socket.emit('gameError', {message: 'Please select a different avatar'})
		}
		this.server.player.setAvatar(avatar)
		this.server.player.setState('READY')
		this.server.game.update()
	}

}

module.exports = WolfGamePlayerSetup
