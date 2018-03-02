var Character = require('./character.model')

class Cupid extends Character {

	constructor(player) {
		super(player)
		this.title = 'Cupid'
		this.icon = '/imgs/characters/cupid.png'
		this.team = 'Villagers'
		this.max = 1
		this.description = [
			'You will choose two players to become lovers on the first night',
			'If either of the lovers dies the other will die immediatly of a broken heart',
			'Also you\'re secretly a dog in human form!'
		]
	}
	
}

module.exports = Cupid