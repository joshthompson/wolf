class WolfGamePlayerDay {

	constructor(server) {
		this.server = server
	}

	vote(player) {
	}

	accuse(id) {
		console.log('VOTE FOR ', id)
		this.server.game.accuse(this.server.player.id, id)
		this.server.game.update()
	}

	withdrawAccusation() {
		this.server.game.withdrawAccusation(this.server.player.id)
		this.server.game.update()
	}

}

module.exports = WolfGamePlayerDay
