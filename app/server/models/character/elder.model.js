var Character = require('./character.model')

class Elder extends Character {

	constructor(player) {
		super(player)
		this.title = 'The Village Elder'
		this.icon = '/imgs/characters/elder.png'
		this.team = 'Villagers'
		this.hp = 2
		this.max = 1
		this.votePower = 1.1
		this.description = [
			'You are the eldest and wisest of the villagers',
			'It\'ll take two wolf attacks to kill you',
			'In the event of a tie; your vote counts more'
			// '(If their is a Mayor, only their vote has more power)'
		]
	}

	death() {
		this.player
	}

}

module.exports = Elder