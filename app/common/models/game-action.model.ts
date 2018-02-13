import { Action } from './action.model'

export class GameAction extends Action {
	private player: Player
	constructor(data?: any) {
		data = typeof data === 'object' ? data : {}
		super(data)
		// Set Player
		if (data.player instanceof Player) this.player = data.user
		else this.player = new Player(data.player)
	}
}
