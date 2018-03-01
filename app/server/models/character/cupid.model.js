var Character = require('./character.model')

class Cupid extends Character {

	constructor(player) {
		super(player)
		this.name = 'Cupid'
	}
	
}

module.exports = Cupid