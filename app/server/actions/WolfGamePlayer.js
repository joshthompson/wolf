// var WolfGamePlayerCommon = require('./WolfGamePlayerCommon')
var WolfGamePlayerSetup = require('./WolfGamePlayerSetup')
var WolfGamePlayerIntro = require('./WolfGamePlayerIntro')
// var WolfGamePlayerNight = require('./WolfGamePlayerNight')
var WolfGamePlayerDay = require('./WolfGamePlayerDay')
// var WolfGamePlayerPost = require('./WolfGamePlayerPost')

class WolfGamePlayer {

	constructor(server) {
		this.server = server
		// this.common = new WolfGamePlayerCommon(server)
		this.setup = new WolfGamePlayerSetup(server)
		this.intro = new WolfGamePlayerIntro(server)
		// this.night = new WolfGamePlayerNight(server)
		this.day = new WolfGamePlayerDay(server)
		// this.post = new WolfGamePlayerPost(server)
	}

	do(state, action, ...data) {
		if (this.server.mode !== 'player') { // Validate mode
			// TODO: VALIDATE MDOE
		}
		if (!this.server.game) { // Validate game exists
			return this.server.socket.emit('gameError', {message: 'Couldn\'t find game', error: 'NO_GAME'})
		}
		if (!this.server.player) { // Validate player exists
			return this.server.socket.emit('gameError', {message: 'Couldn\'t find player', error: 'NO_PLAYER'})
		}
		if (state !== 'common' && this.server.game.state !== state.toUpperCase()) { // Validate state is correct
			return this.server.socket.emit('action', {message: 'Action not permitted', error: 'ACTION_NOT_PERMITTED'})
		}
		if (!this[state] || !this[state][action]) { // Validate action exists
			return this.server.socket.emit('action', {message: 'Action not found', error: 'ACTION_NOT_FOUND'})
		}
		// Do action
		this[state][action](...data)
	}
}

module.exports = WolfGamePlayer
