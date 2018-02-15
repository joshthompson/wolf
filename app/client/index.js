import { WolfGame } from '../common/models/wolf-game.model'
// import { Player } from '../common/models/player.model'
// import { GameCode } from '../common/models/game-code.model'
// import { EventEmitter } from 'events'

var request = require('then-request')
var Cookie = require('js-cookie')

// Sockets :D
// socket.open()

let WolfGameController = {

	socket: null,

	init: () => {
		WolfGameController.setupSocket()
		WolfGameController.setupDOMListeners()
	},

	setupDOMListeners: () => {
		document.getElementById('create-btn').onclick = WolfGameController.createGame
		document.getElementById('join-btn').onclick = WolfGameController.joinGame
	},

	setupSocket: () => {
		WolfGameController.socket = io('http://localhost:3000')
		WolfGameController.socket.on('flaps', WolfGameController.flaps)
	},

	createGame: () => {
		WolfGameController.socket.emit('createGame', {asdas: 123123})
		console.log('yeah yeah yeah')
	},

	joinGame: () => {
		WolfGameController.socket.emit('joinGame', {
			game: document.getElementById('game-code').value,
			player: document.getElementById('player-name').value
		})
	}
}

WolfGameController.init()




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
