var Character = require('./character.model')

class Elder extends Character {

	constructor(player) {
		super(player)
		this.name = 'The Village Elder'
		this.hp = 2
	}

	death() {
		this.player
	}

}

module.exports = Elder