var WolfGame = require('./models/WolfGame.model')
var GameCode = require('./models/GameCode.model')
var Player = require('./models/Player.model')
var WolfGameHost = require('./actions/WolfGameHost')
var WolfGamePlayer = require('./actions/WolfGamePlayer')
var WolfGameCommon = require('./actions/WolfGameCommon')

class WolfGameServer {

	constructor(socket, games) {
		// Data
		this.socket = socket
		this.games = games
		this.mode = null
		this.game = null
		this.player = null
		this.setupSocket()
		// Settings
		this.inactiveGameTimeout = 60 * 1000
		// Include action functions
		this.actions = {
			host: new WolfGameHost(this),
			player: new WolfGamePlayer(this),
			common: new WolfGameCommon(this)
		}
	}

	setupSocket() {
		// Common
		this.socket.on('disconnect', (...args) => this.actions.common.disconnect(...args))
		this.socket.on('recoverGame', (...args) => this.actions.common.recoverGame(...args))
		this.socket.on('requestStats', (...args) => this.actions.common.requestStats(...args))
		// Connection
		this.socket.on('joinGame', (...args) => this.actions.common.joinGame(...args))
		this.socket.on('createGame', (...args) => this.actions.common.createGame(...args))
		// Host
		this.socket.on('startGame', (...args) => this.actions.host.do('setup', 'startGame', ...args))
		this.socket.on('endGame', (...args) => this.actions.host.do('common', 'endGame', ...args))
		// Setup
		this.socket.on('changeName', (...args) => this.actions.player.do('setup', 'changeName', ...args))
		this.socket.on('selectAvatar', (...args) => this.actions.player.do('setup', 'selectAvatar', ...args))
		// Intro
		this.socket.on('playerReady', (...args) => this.actions.player.do('intro', 'playerReady', ...args))
		// Night
		this.socket.on('villagerNight', (...args) => this.actions.player.do('night', 'villager', ...args))
		this.socket.on('wolfKill', (...args) => this.actions.player.do('night', 'wolfKill', ...args))
		// Day
		this.socket.on('accuse', (...args) => this.actions.player.do('day', 'accuse', ...args))
		this.socket.on('withdrawAccusation', (...args) => this.actions.player.do('day', 'withdrawAccusation', ...args))
		this.socket.on('vote', (...args) => this.actions.player.do('day', 'vote', ...args))
	}

}

module.exports = WolfGameServer
