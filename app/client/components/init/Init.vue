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
	<div id="init" class="view form-view">
		<div>
			<button @click="createGame()">Create</button>
		</div>
		<hr />
		<div>
			<input v-model="name" placeholder="player-name" />
			<input v-model="code" placeholder="game-code" />
			<button @click="joinGame()">Join</button>
		</div>
	</div>
</template>
