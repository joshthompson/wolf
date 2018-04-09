class WolfGameHostSetup {

	constructor(server) {
		this.server = server
	}

	startGame() {
		this.server.game.setState('INTRO')
		this.server.game.setupPlayerIdentities()
		this.server.game.update()
	}

}

module.exports = WolfGameHostSetup
