var GameCode = require('./game-code.model')
var Player = require('./player.model')
var Accusation = require('./accusation.model')
var Vote = require('./vote.model')
var Action = require('./action.model')

var EventEmitter = require('events')
var sha512 = require('js-sha512').sha512

class WolfGame {

	constructor(data) {

		// Game data
		this.created = new Date()
		this.code = new GameCode()
		this.players = []
		this.minPlayers = 0//2 // testing ... should probably be 4
		this.state = null // 'SETUP' | 'INTRO' | 'DAY' | 'NIGHT' | 'END' | null = 'SETUP'
		this.subState = null
		this.accusations = []
		this.votes = []
		this.token = null
		this.history = []
		this.host = null // Socket object
		
		// Class data
		this.event = new EventEmitter()

		// Base data object
		data = typeof data === 'object' ? data : {}
		// Set ID
		if (typeof data.id === 'number') this.id = data.id
		// Set Created
		if (data.create instanceof Date) this.created = data.created
		else if (typeof data.create === 'string') this.created = new Date(data.created)
		else this.created = new Date()
		// Set Code
		if (data.code instanceof GameCode) this.code = data.code
		else if (typeof data.code === 'string') this.code = new GameCode(data.code)
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
		// Set Host
		if (data.host) this.host = data.host
	}

	update() {
		this.host.emit('updateGame', this.toPrivateJSON())
		this.players.forEach(player => player.updateGame())
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
			player.setCharacter(index === wolf ? 'WOLF' : 'VILLAGER')
		})
	}

	end() {
		this.host.emit('gameEnded')
		this.players.forEach(player => player.socket.emit('gameEnded'))
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
