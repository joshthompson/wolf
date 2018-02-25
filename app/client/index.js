import { WolfGame } from '../common/models/wolf-game.model'
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
		},
		startGame: () => WolfGameController.socket.emit('startGame'),
		error: error => console.error(error)
	},

	client: {
		// Generic
		updatePlayer: player => WolfGameController.player = player,
		// Join Game
		joinGame: (code, name) => WolfGameController.socket.emit('joinGame', {game: code, player: name}),
		gameJoined: data => {
			WolfGameController.game = data.game
			WolfGameController.mode = 'player'
			WolfGameController.player = data.player
			WolfGameController.storeActiveGame()
		},
		// Change User
		changeName: name => WolfGameController.socket.emit('changeName', name),
		selectAvatar: avatar => WolfGameController.socket.emit('selectAvatar', avatar)
	},

	common: {
		updateGame: game => WolfGameController.game = game,
		recoverGame: data => {
			WolfGameController.mode = data.player ? 'player' : 'host'
			WolfGameController.game = data.game
			WolfGameController.player = data.player ? data.player : null
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
		}
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
