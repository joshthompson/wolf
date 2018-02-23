<script>
	export default {
		name: 'init',
		props: {
			game: Object
		},
		data() {
			return {
				name: '',
				code: ''
			}
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
				<button @click="createGame()" class="green">Create New Game</button>
			</div>
			<div class="form-group">
				<h3>Or Join A  Game</h3>
				<div class="input">
					<label>Room Code</label>
					<input v-model="code" autocomplete="off" autocorrect="off" spellcheck="false" />
				</div>
				<div class="input">
					<label>Name</label>
					<input v-model="name" />
				</div>
				<button @click="joinGame()">Join</button>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	.input {
		padding: 0px 0px 10px;
		label {
			margin-top: 20px;
		}
		label, input {
			display: block;
			width: 100%;
			text-transform: uppercase;
		}
	}
</style>