var Character = require('./character.model')

class Wolf extends Character {

	constructor(player) {
		super(player)
		this.type = 'wolf'
		this.title = 'A Werewolf'
		this.icon = '/imgs/characters/wolf.png'
		this.team = 'Werewolves'
		this.description = [
			'You are a werewolf whose aim it is to pick off villagers one by one until none remain',
			'At night you must select a target to kill',
			'By day you must try and blend in and not get killed by the villagers'
		]
	}
	
}

module.exports = Wolf