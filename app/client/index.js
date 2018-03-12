import io from 'socket.io-client'
import Vue from 'vue'
import App from './app.vue'

import request from 'then-request'
import Cookie from 'js-cookie'

let WolfGameController = {

	socket: null,
	game: null,
	mode: null, // 'host' | 'player'
	player: null,
	stats: null,
	recoverable: null,

	time: 8,
	timeStep: 1 / 60 / 10 *10, // 6 seconds per game hour
	refresh: 50,
	timeTargetTimeout: null,


	init: () => {
		WolfGameController.setupSocket()
		WolfGameController.recoverActiveGame()
	},

	recoverActiveGame: () => {
		let gameData = Cookie.getJSON('game_data')
		if (gameData) {
			WolfGameController.socket.emit('recoverGame', gameData)
		}
	},

	storeActiveGame: game => {
		if (WolfGameController.game) {
			Cookie.set('game_data', {
				code: WolfGameController.game.code,
				token: WolfGameController.player ? WolfGameController.player.token : WolfGameController.game.token
			})
		}
	},

	updateTime: () => {
		WolfGameController.time += WolfGameController.timeStep
		WolfGameController.time %= 24
		setTimeout(WolfGameController.updateTime, WolfGameController.refresh)
	},

	setTimeTarget: (target, timestamp) => {
		let now = new Date().getTime()
		let timeTo = timestamp - now
		let steps = timeTo / WolfGameController.refresh
		let time = target + (target < WolfGameController.time ? 24 : 0)
		WolfGameController.timeStep = (time - WolfGameController.time) / steps
		clearTimeout(WolfGameController.timeTargetTimeout) // Stops two targets interferring
		WolfGameController.timeTargetTimeout = setTimeout(() => {
			WolfGameController.timeStep = 0
			WolfGameController.time = target
		}, timeTo)
	},

	removeActiveGame: () => {
		Cookie.remove('game_data')
	},

	setupSocket: () => {
		WolfGameController.socket = io()
		WolfGameController.setupSocketListeners()
	},

	setupSocketListeners: () => {
		Object.keys(WolfGameController.host).forEach(event => WolfGameController.socket.on(event, WolfGameController.host[event]))
		Object.keys(WolfGameController.client).forEach(event => WolfGameController.socket.on(event, WolfGameController.client[event]))
		Object.keys(WolfGameController.common).forEach(event => WolfGameController.socket.on(event, WolfGameController.common[event]))
	},

	host: {
		createGame: () => WolfGameController.socket.emit('createGame'),
		gameCreated: data => {
			WolfGameController.game = data.game
			WolfGameController.mode = 'host'
			WolfGameController.storeActiveGame()
			WolfGameController.updateTime()
		},
		setTimeTarget: data => WolfGameController.setTimeTarget(data.time, data.timestamp),
		startGame: () => WolfGameController.socket.emit('startGame'),
		error: error => console.error(error)
	},

	client: {
		// Generic
		updatePlayer: player => WolfGameController.player = player,
		// Join Game
		joinGame: (code, name) => {
			Cookie.set('player_name', name)
			WolfGameController.socket.emit('joinGame', {game: code, player: name})
		},
		gameJoined: data => {
			WolfGameController.game = data.game
			WolfGameController.mode = 'player'
			WolfGameController.player = data.player
			WolfGameController.storeActiveGame()
		},
		// Change User
		changeName: name => WolfGameController.socket.emit('changeName', name),
		selectAvatar: avatar => WolfGameController.socket.emit('selectAvatar', avatar),
		setState: state => WolfGameController.socket.emit('setState', state),
		// Accusations
		accuse: player => WolfGameController.socket.emit('accuse', player),
		withdrawAccusation: () => WolfGameController.socket.emit('withdrawAccusation'),
	},

	common: {
		updateGame: game => WolfGameController.game = game,
		recoverGame: data => {
			if (data.player) {
				WolfGameController.recoverable = data
			} else {
				WolfGameController.mode = 'host'
				WolfGameController.game = data.game
			}
		},
		recoverPlayerGame: () => {
			WolfGameController.mode = 'player'
			WolfGameController.game = WolfGameController.recoverable.game
			WolfGameController.player = WolfGameController.recoverable.player
		},
		gameError: error => {
			console.log(error)
			WolfGameController.message(error.message)
		},
		gameEnded: () => {
			if (WolfGameController.player) {
				WolfGameController.message('Game has ended')
			}
			WolfGameController.removeActiveGame()
			WolfGameController.mode = null
			WolfGameController.game = null
			WolfGameController.player = null
		},
		disconnect: () => WolfGameController.recoverActiveGame(),
		requestStats: () => WolfGameController.socket.emit('requestStats'),
		stats: stats => WolfGameController.stats = stats
	},
	message: message => alert(message),
	endGame: () => WolfGameController.socket.emit('endGame')

}

WolfGameController.init()

// Init Vue App
window.app = new Vue({
	el: '#app',
	data: { game: WolfGameController },
	template: '<app :game="game" />',
	components: { App }
})
