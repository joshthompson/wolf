var Action = require('./action.model')

class GameAction extends Action {
	constructor(data) {
		this.player
		data = typeof data === 'object' ? data : {}
		super(data)
		// Set Player
		if (data.player instanceof Player) this.player = data.user
		else this.player = new Player(data.player)
	}
}

module.exports = GameAction
