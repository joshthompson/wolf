<script>
	export default {
		name: 'init',
		props: {
			'game': Object,
			'name': String,
			'code': String
		},
		methods: {
			createGame() {
				this.game.host.createGame()
			},
			joinGame(name, code) {
				this.game.client.joinGame(this.code, this.name)
			}
		}
	}
</script>

<template>
	<div id="init" class="view">
		<h1>Wolf</h1>
		<div class="form-view">
			<div class="form-group">
				<button @click="createGame()">Create New Game</button>
			</div>
			<div class="form-group">
				<input v-model="name" placeholder="player-name" />
				<input v-model="code" placeholder="game-code" />
				<button @click="joinGame()">Join</button>
			</div>
		</div>
	</div>
</template>
