var Character = require('./character.model')

class Wolf extends Character {

	constructor(player) {
		super(player)
		this.name = 'A Werewolf'
	}
	
}

module.exports = Wolf