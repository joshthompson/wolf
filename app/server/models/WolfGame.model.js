var Game = require('./Game.model')
var GameCode = require('./GameCode.model')
var Player = require('./Player.model')
var Accusation = require('./Accusation.model')
var Vote = require('./Vote.model')
var Action = require('./Action.model')
var sha512 = require('js-sha512').sha512

// Roles
var Cupid = require('./character/Cupid.model')
var Devil = require('./character/Devil.model')
var Elder = require('./character/Elder.model')
var Seer = require('./character/Seer.model')
var Villager = require('./character/Villager.model')
var Wolf = require('./character/Wolf.model')

// WolfGame
class WolfGame extends Game {

	constructor(data) {
		super()

		// Game data
		this.created = new Date()
		this.code = new GameCode()
		this.players = []
		this.minPlayers = 1//2 // testing ... should probably be 4
		this.maxPlayers = 20
		this.state = null // 'SETUP' | 'INTRO' | 'DAY' | 'NIGHT' | 'END' | null = 'SETUP'
		this.day = 0 // First night (before game starts) is Night 0. Then Day X / Night X use this value
		this.subState = null
		this.data = {}
		this.accusations = []
		this.votes = []
		this.token = null
		this.history = []
		this.socket = null // Socket object
		this.time = 9 // Hour in day 0 - 24

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
		// Set Data
		if (typeof data.data === 'object') this.data = data.data
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

	getPlayerById(id) {
		const filtered = this.players.filter(player => player.id === id)
		return filtered ? filtered[0] : null
	}

	getPlayerByName(name) {
		const filtered = this.players.filter(player => player.name === name)
		return filtered ? filtered[0] : null
	}

	setupPlayerIdentities() {
		// TODO: replace with team balancer algorithm
		this.players.forEach((player, index) => {
			player.setCharacter(index < 2 ? new Wolf() : new Villager())
		})
		// Add custom data for roles
		this.players.forEach(player => {
			if (player.character.type === 'wolf') {
				player.addData(
					'wolves',
					this.players
						.filter(player => player.character.type === 'wolf')
						.map(player => player.toPublicJSON())
				)
			}
		})
	}

	checkPlayersState(state) {
		let result = true
		this.players.forEach(player => {
			if (player.state !== state) {
				result = false
			}
		})
		return result
	}

	vote(voter, vote) {
		this.votes.push(new Vote({
			voter: voter,
			vote: vote
		}))
	}

	withdrawVote(voter) {
		this.votes = this.votes.filter(vote => vote.voter.id !== voter.id)
	}

	voteTally(applyVotePower = false) {
		let tally = {}
		this.votes.forEach(v => {
			tally[v.vote.id] = tally[v.vote.id] || 0
			tally[v.vote.id] += applyVotePower ? v.voter.character.votePower : 1
		})
		return tally
	}

	checkPlayersReady() {
		const all = this.players.filter(player => player.alive).length
		const ready = this.players.filter(player => player.alive && player.state === 'READY').length
		return all === ready
	}

	end() {
		console.log(`Game ended: ${this.code}`)
		this.socket.emit('gameEnded')
		this.players.forEach(player => player.socket.emit('gameEnded'))
	}

	setState(state, subState = null) {
		this.votes = []
		this.accusations = []
		this.state = state
		this.subState = subState
		this.players.forEach(player => player.setState(null))
	}

	activeSockets() {
		let activeSockets = this.socket.connected ? 1 : 0
		this.players.forEach(player => activeSockets += player.socket.connected ? 1 : 0)
		return activeSockets
	}

	addData(key, value) {
		this.data[key] = value
	}

	toPublicJSON() {
		return {
			created: this.created,
			code: this.code,
			players: this.players.map(player => player.toPublicJSON()),
			minPlayers: this.minPlayers,
			state: this.state,
			subState: this.subState,
			accusations: this.accusations,
			day: this.day
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
			day: this.day,
			time: this.time,
			votes: this.votes,
			token: this.token
		}
	}

}

module.exports = WolfGame
