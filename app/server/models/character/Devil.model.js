var Character = require('./Character.model')

class Devil extends Character {

	constructor(player) {
		super(player)
		this.type = 'devil'
		this.title = 'The Devil'
		this.icon = '/imgs/characters/devil.png'
		this.team = 'Werewolves'
		this.max = 1
		this.description = [
			'You on the side of the Werewolves',
			'You know who they are... but they don\'t know who you are',
			'You must attempt to help the wolves by diverting attention away from them'
		]
	}
	
}

module.exports = Devil