var Game = require('./game.model')
var RoomCode = require('./room-code.model')
var Player = require('./player.model')
var Accusation = require('./accusation.model')
var Vote = require('./vote.model')
var Action = require('./action.model')
var sha512 = require('js-sha512').sha512

// Roles
var Cupid = require('./character/cupid.model')
var Devil = require('./character/devil.model')
var Elder = require('./character/elder.model')
var Seer = require('./character/seer.model')
var Villager = require('./character/villager.model')
var Wolf = require('./character/wolf.model')

// WolfGame
class WolfGame extends Game {

	constructor(data) {
		super()

		// Game data
		this.created = new Date()
		this.code = new RoomCode()
		this.players = []
		this.minPlayers = 1//2 // testing ... should probably be 4
		this.state = null // 'SETUP' | 'INTRO' | 'DAY' | 'NIGHT' | 'END' | null = 'SETUP'
		this.day = 0 // First night (before game starts) is Night 0. Then Day X / Night X use this value
		this.subState = null
		this.accusations = []
		this.votes = []
		this.token = null
		this.history = []
		this.socket = null // Socket object

		// Base data object
		data = typeof data === 'object' ? data : {}
		// Set ID
		if (typeof data.id === 'number') this.id = data.id
		// Set Created
		if (data.create instanceof Date) this.created = data.created
		else if (typeof data.create === 'string') this.created = new Date(data.created)
		else this.created = new Date()
		// Set Code
		if (data.code instanceof RoomCode) this.code = data.code
		else if (typeof data.code === 'string') this.code = new RoomCode(data.code)
		// Set Players
		if (data.players instanceof Array) {
			data.players.forEach((player) => {
				if (player instanceof Player) this.players.push(player)
				else this.players.push(new Player(player))
			})
		}
		// Set State
		if (typeof data.state === 'string') this.state = data.state
		// Set Sub State
		if (typeof data.subState === 'string') this.subState = data.subState
		// Set Accusations
		if (data.accusations instanceof Array) {
			data.accusations.forEach((accusation) => {
				if (accusation instanceof Accusation) this.accusations.push(accusation)
				else this.accusations.push(new Accusation(accusation))
			})
		}
		// Set Votes
		if (data.votes instanceof Array) {
			data.votes.forEach((vote) => {
				if (vote instanceof Vote) this.votes.push(vote)
				else this.votes.push(new Vote(vote))
			})
		}
		// Set Token
		if (typeof data.token === 'string') this.token = data.token
		else this.token = this.createToken()
		// Set History
		if (data.history instanceof Array) {
			data.history.forEach((action) => {
				if (history instanceof Vote) this.history.push(action)
				else this.history.push(new Action(action))
			})
		}
		// Set Socket
		if (data.socket) this.socket = data.socket
	}

	update() {
		this.socket.emit('updateGame', this.toPrivateJSON())
		this.players.forEach(player => player.update())
	}

	createToken() {
		return sha512(`wolf-game-${new Date()}-${Math.random()}`)
	}

	addPlayer(player) {
		this.players.push(player)
		this.update()
	}

	findPlayerByName(name) {
		let filtered = this.players.filter(player => player.name === name)
		return filtered ? filtered[0] : null
	}

	setupPlayerIdentities() {
		let wolf = Math.floor(Math.random() * this.players.length)
		this.players.forEach((player, index) => {
			player.setCharacter(index === wolf ? new Wolf() : new Villager())
		})
	}

	end() {
		this.socket.emit('gameEnded')
		this.players.forEach(player => player.socket.emit('gameEnded'))
	}

	setState(state) {
		this.state = state
		this.players.forEach(player => player.setState(null))
	}

	activeSockets() {
		let activeSockets = this.socket.connected ? 1 : 0
		this.players.forEach(player => activeSockets += player.socket.connected ? 1 : 0)
		return activeSockets
	}

	toPublicJSON() {
		return {
			created: this.created,
			code: this.code,
			players: this.players.map(player => player.toPublicJSON()),
			minPlayers: this.minPlayers,
			state: this.state,
			subState: this.subState,
			accusations: this.accusations
		}
	}

	toPrivateJSON() {
		return {
			created: this.created,
			code: this.code,
			players: this.players.map(player => player.toPublicJSON()),
			minPlayers: this.minPlayers,
			state: this.state,
			subState: this.subState,
			accusations: this.accusations,
			votes: this.votes,
			token: this.token
		}
	}

}

module.exports = WolfGame
