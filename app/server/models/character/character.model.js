class Character {

	constructor(height, width) {
		this.title = null
		this.icon = null
		this.description = null
		this.team = null
		this.hp = 1
		this.max = null
		this.votePower = 1
	}

	dayStart() {
		// What happens at start of day
	}

	dayEnd() {
		// What happens at start of day
	}

	nightStart() {
		// What happens at start of night
	}

	nightEnd() {
		// What happens at end of night
	}

	checkWin() {
		// Check win condition
	}

	death() {
		// What happens at death
	}

	toPublicJSON() {
		return {
			type: this.type,
			title: this.title,
			team: this.team,
			icon: this.icon,
			description: this.description
		}
	}
	
}

module.exports = Character