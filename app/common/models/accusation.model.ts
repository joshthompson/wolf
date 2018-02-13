import { Player } from './player.model'

export class Accusation {
	accuser: Player
	accused: Player
	constructor(data: any) {
		// Set Accuser
		if (data.accuser instanceof Player) this.accuser = data.accuser
		else this.accuser = new Player(data.accuser)
		// Set Accused
		if (data.accused instanceof Player) this.accused = data.accused
		else this.accused = new Player(data.accused)
	}
}
