class WolfGameHostSetup {

	constructor(server) {
		this.server = server
	}

	startGame() {
		this.server.game.setState('INTRO')
		this.server.socket.emit('setTimeTarget', {time: 22, timestamp: new Date().getTime() + 800})
		this.server.game.setupPlayerIdentities()
		this.server.game.update()
	}

}

module.exports = WolfGameHostSetup
