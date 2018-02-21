import { WolfGame } from '../common/models/wolf-game.model'
// import { Player } from '../common/models/player.model'
// import { GameCode } from '../common/models/game-code.model'
// import { EventEmitter } from 'events'

import Vue from 'vue'
import App from './app.vue'

var request = require('then-request')
var Cookie = require('js-cookie')

// Sockets :D
// socket.open()

let WolfGameController = {

	socket: null,
	token: null,
	game: null,
	mode: null, // 'host' | 'player'

	init: () => {
		WolfGameController.setupSocket()
		WolfGameController.setupDOMListeners()
	},

	setupDOMListeners: () => {
		// document.getElementById('create-btn').onclick = WolfGameController.host.createGame
		// document.getElementById('join-btn').onclick = WolfGameController.client.joinGame
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
		},
		gameCreateFail: error => console.error(error)
	},

	client: {
		joinGame: (code, name) => WolfGameController.socket.emit('joinGame', {game: code, player: name}),
		gameJoined: data => {
			WolfGameController.game = data.game
			WolfGameController.mode = 'player'
			console.log('game joined', data.game)
		},
		gameJoinFail: error => console.log(error)
	},

	common: {
		updateGame: data => {
			WolfGameController.game = data.game
			console.log('game updated', data.game)
		}
	}

}

WolfGameController.init()

window.app = new Vue({
	el: '#app',
	data: { game: WolfGameController },
	template: '<app :game="game" />',
	components: { App }
})

// // Game object
// let game

// // Updates - TODO: Upgrade to data sockets
// let fetchUpdates = (timeout) => {
// 	if (game) {
// 		timeout = timeout ? timeout : 10000
// 		request('GET', `/api/game/${game.getId()}`).getBody('utf8').then(JSON.parse).done((g) => {
// 			game = new WolfGame(g)
// 			console.log('UPDATED', g)
// 			setTimeout(fetchUpdates, timeout, timeout)
// 		})
// 	}
// }

// // Setup
// let setupGame = () => {

// 	// Is game in cookie... if so load (allows for refreshing)
// 	let load = Cookie.getJSON('game')
// 	if (load) {
// 		game = new WolfGame(Cookie.getJSON('game'))
// 		game.event.on('update', () => request('PUT', `/api/game/${game.getId()}`, {json: {game: game}}))
// 		fetchUpdates()
// 	}

// 	// Join game
// 	document.getElementById('join-btn').onclick = (event) => {
// 		let player = new Player(document.getElementById('player-name').value)
// 		let code = new GameCode(document.getElementById('game-code').value)
// 		request('POST', `/api/game/${code}/join`, {json: {player: player}}).getBody('utf8').then(JSON.parse).done((g) => {
// 			game = new WolfGame(g)
// 			fetchUpdates()
// 			console.log('JOINED', g)
// 		})
// 		Cookie.set('player', player)
// 	}

// }

// setupGame()
