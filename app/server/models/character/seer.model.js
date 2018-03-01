var Character = require('./character.model')

class Seer extends Character {

	constructor(player) {
		super(player)
		this.name = 'A Seer'
	}
	
}

module.exports = Seer