class WolfGamePlayerIntro {

	constructor(server) {
		this.server = server
	}

	playerReady() {
		this.server.player.setState('READY')
		if (this.server.game.checkPlayersState('READY')) {
			this.server.game.setState('NIGHT')
			this.server.game.socket.emit('setTimeTarget', {time: 0, timestamp: new Date().getTime() + 800})
		}
		this.server.game.update()
	}

}

module.exports = WolfGamePlayerIntro
