import { WolfGame } from '../../app/common/models/wolf-game.model'
// import { Player } from '../../app/common/models/player.model'
// import { GameCode } from '../../app/common/models/game-code.model'
// import { EventEmitter } from 'events'

var request = require('then-request')
var Cookie = require('js-cookie')

new WolfGame()

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

// 	// Create new game
// 	document.getElementById('create-btn').onclick = (event) => {
// 		game = new WolfGame()
// 		request('POST', '/api/game', {json: {game: game}}).getBody('utf8').then(JSON.parse).done((g) => {
// 			game.setId(g.id)
// 			game.setToken(g.token)
// 			fetchUpdates()
// 		})
// 		game.event.on('update', () => request('PUT', `/api/game/${game.getId()}`, {json: {game: game}}))
// 		Cookie.set('game', game)
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
