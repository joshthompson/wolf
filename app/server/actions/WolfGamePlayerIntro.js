class WolfGamePlayerIntro {

	constructor(server) {
		this.server = server
	}

	playerReady() {
		this.server.player.setState('READY')
		if (this.server.game.checkPlayersState('READY')) {
			const firstNightAction = this.server.game.players.filter(player => player.character.firstNightAction === true).length ? true : false
			if (firstNightAction) {
				this.server.game.setState('NIGHT')
			} else {
				this.server.game.setState('DAY', 'MORNING')
			}
		}
		this.server.game.update()
	}

}

module.exports = WolfGamePlayerIntro
