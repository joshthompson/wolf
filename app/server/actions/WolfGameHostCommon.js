class WolfGameHostCommon {

	constructor(server) {
		this.server = server
	}

	endGame(data) {
		this.server.game.end()
		delete this.server.games[this.server.game.code]
		this.server.game = null
	}

}

module.exports = WolfGameHostCommon
