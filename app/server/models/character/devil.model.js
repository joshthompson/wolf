var Character = require('./character.model')

class Devil extends Character {

	constructor(player) {
		super(player)
		this.name = 'The Devil'
	}
	
}

module.exports = Devil