class WolfGamePlayerNight {

	constructor(server) {
		this.server = server
	}

	villager(id, thing) {
		const player = this.server.game.getPlayerById(id)
		if (!player) {
			return this.server.socket.emit('gameError', {message: 'Player not found', error: 'INVALID_INPUT'})
		}
		this.server.game.data.opinions = this.server.game.data.opinions || []
		this.server.game.data.opinions.push({
			from: this.server.player.id,
			about: id,
			thing: thing
		})
		this.server.player.setState('READY')
		this.server.player.update()
		this.checkGameState()
	}

	wolfKill(id) {

		const wolf = this.server.player
		const victim = this.server.game.getPlayerById(id)

		if (!victim) {
			return this.server.socket.emit('gameError', {message: 'Player not found', error: 'INVALID_INPUT'})
		}
		if (this.server.game.day === 0) {
			// return this.server.socket.emit('gameError', {message: 'No killing on the first night', error: 'INVALID_GAME_STATE'})
		}
		if (wolf.character.type !== 'wolf') {
			return this.server.socket.emit('gameError', {message: 'You\'re not a wolf', error: 'INVALID_ACTION'})
		}
		if (victim.character.type === 'wolf') {
			return this.server.socket.emit('gameError', {message: 'Wolves don\'t kill wolves', error: 'INVALID_ACTION'})
		}
		if (victim.character.alive === false) {
			return this.server.socket.emit('gameError', {message: 'That player is already dead', error: 'INVALID_ACTION'})
		}

		this.server.game.withdrawVote(wolf)
		this.server.game.vote(wolf, victim)

		const votes = this.server.game.voteTally()
		const wolves = this.server.game.players.filter(player => player.character.type === 'wolf' && player.alive)
		wolves.forEach(wolf => wolf.socket.emit('wolfKillVotes', votes))
		if (votes[victim.id] === wolves.length) { // There has been a unanimous decision
			this.server.game.addData('wolfTarget', victim.id)
			wolves.forEach(wolf => wolf.setState('READY'))
			this.checkGameState()
		}
	}

	checkGameState() {
		if (this.server.game.checkPlayersReady()) {
			this.server.game.setState('DAY', 'MORNING')
			this.server.game.update()
		}
	}

}

module.exports = WolfGamePlayerNight
