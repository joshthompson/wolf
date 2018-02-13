export class Player {
	id: number
	name: string
	avatar: string
	character: string = 'VILLAGER' // 'VILLAGER' | 'WEREWOLF'
	alive: Boolean = true
	token: string
	constructor(data?: any) {
		data = typeof data === 'string' ? {name: data} : (typeof data === 'object' ? data : {})
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
