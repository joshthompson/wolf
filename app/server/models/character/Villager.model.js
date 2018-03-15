var Character = require('./Character.model')

class Villager extends Character {

	constructor(player) {
		super()
		this.type = 'villager'
		this.title = 'A Villager'
		this.icon = null // Use regular avatar icon
		this.team = 'Villagers'
		this.description = [
			'You are a villager who is helping in the battle with the werewolves',
			'You must work hard to discover the werewolves and partake in daily votes with the hope of ridding the village of evil'
		]
	}

}

module.exports = Villager