var WolfGameHostCommon = require('./WolfGameHostCommon')
var WolfGameHostSetup = require('./WolfGameHostSetup')
// var WolfGameHostIntro = require('./WolfGameHostIntro')
// var WolfGameHostNight = require('./WolfGameHostNight')
// var WolfGameHostDay = require('./WolfGameHostDay')
// var WolfGameHostPost = require('./WolfGameHostPost')

class WolfGameHost {

	constructor(server) {
		this.server = server
		this.common = new WolfGameHostCommon(server)
		this.setup = new WolfGameHostSetup(server)
		// this.intro = new WolfGameHostIntro(server)
		// this.night = new WolfGameHostNight(server)
		// this.day = new WolfGameHostDay(server)
		// this.post = new WolfGameHostPost(server)
	}

	do(state, action, ...data) {
		if (this.server.mode !== 'host') { // Validate mode
			// TODO: VALIDATE MDOE
		}
		if (!this.server.game) { // Validate game exists
			return this.server.socket.emit('gameError', {message: 'Couldn\'t find game'})
		}
		if (state !== 'common' && this.server.game.state !== state.toUpperCase()) { // Validate state is correct
			return this.server.socket.emit('action', {message: 'Action not permitted'})
		}
		if (!this[state] || !this[state][action]) { // Validate action exists
			return this.server.socket.emit('action', {message: 'Action not found'})
		}
		// Do action
		this[state][action](...data)
	}

}

module.exports = WolfGameHost
