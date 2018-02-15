class Player {
	constructor(data) {
		// Player Data
		this.id
		this.name
		this.avatar
		this.character = 'VILLAGER' // 'VILLAGER' | 'WEREWOLF'
		this.alive = true
		this.token
		// Generic object
		data = typeof data === 'string' ? {name} : (typeof data === 'object' ? data : {})
		// Set ID
		if (typeof data.id === 'number') this.id = data.id
		// Set Name
		if (typeof data.name === 'string') this.name = data.name
		// Set Avatar
		if (typeof data.avatar === 'string') this.avatar = data.avatar
		// Set Character
		if (typeof data.character === 'string') this.character = data.character
		// Set Alive
		if (typeof data.alive === 'boolean') this.alive = data.alive
		// Set Character
		if (typeof data.token === 'string') this.token = data.token
	}
}

module.exports = Player
