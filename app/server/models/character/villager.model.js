var Character = require('./character.model')

class Villager extends Character {

	constructor(player) {
		super()
		this.name = 'A Villager'
	}

}

module.exports = Villager