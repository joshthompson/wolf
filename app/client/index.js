import { WolfGame } from '../common/models/wolf-game.model'
import io from 'socket.io-client'
import Vue from 'vue'
import App from './app.vue'

import request from 'then-request'
import Cookie from 'js-cookie'

let WolfGameController = {

	socket: null,
	token: null,
	game: null,
	mode: null, // 'host' | 'player'
	player: null,

	init: () => {
		WolfGameController.setupSocket()
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
		},
		// Change User
		changeName: name => WolfGameController.socket.emit('changeName', name),
		selectAvatar: avatar => WolfGameController.socket.emit('selectAvatar', avatar)
	},

	common: {
		updateGame: game => WolfGameController.game = game,
		gameError: error => {
			console.log(error)
			alert(error.message)
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
