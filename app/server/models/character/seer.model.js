var Character = require('./character.model')

class Seer extends Character {

	constructor(player) {
		super(player)
		this.title = 'A Seer'
		this.icon = '/imgs/characters/seer.png'
		this.team = 'Villagers'
		this.description = [
			'You\'re are a powerful seer who is in touch with the supernatural',
			'At night you get visions and can choose a player and their true identity will be revealed'
		]
	}
	
}

module.exports = Seer