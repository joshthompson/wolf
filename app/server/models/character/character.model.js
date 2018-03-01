class Character {

	constructor(height, width) {
		this.name = null
	}

	get icon() {
		return '/imgs/characters/' + this.name.replace(/ /g, '-').toLowerCase() + '.png'
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
	
}

module.exports = Character