var Character = require('./Character.model')

class Cupid extends Character {

	constructor(player) {
		super(player)
		this.type = 'cupid'
		this.title = 'Cupid'
		this.icon = '/imgs/characters/cupid.png'
		this.team = 'Villagers'
		this.max = 1
		this.firstNightAction = true
		this.description = [
			'You will choose two players to become lovers on the first night',
			'If either of the lovers dies the other will die immediatly of a broken heart',
			'Also you\'re secretly a dog in human form!'
		]
	}
	
}

module.exports = Cupid