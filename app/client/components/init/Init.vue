<script>
	import Cookie from 'js-cookie'
	import PopOver from '../common/PopOver.vue'
	export default {
		name: 'init',
		props: {
			game: Object
		},
		components: { PopOver },
		data() {
			return {
				name: '',
				code: '',
				showStats: false
			}
		},
		created() {
			if (Cookie.get('player_name')) {
				this.name = Cookie.get('player_name')
			}
			this.game.common.requestStats()
		},
		methods: {
			createGame() {
				this.game.host.createGame()
			},
			joinGame(name, code) {
				this.game.client.joinGame(this.code, this.name)
			},
			recoverGame() {
				this.game.common.recoverPlayerGame()
			}
		}
	}
</script>

<template>
	<div id="init" class="view">
		<h1>Wolf</h1>
		<div class="form-view">
			<div class="form-group" v-if="game.recoverable">
				<a class="btn blue" @click="recoverGame()">Recover Game</a>
			</div>
			<div class="form-group">
				<button @click="createGame()" class="btn green">Create New Game</button>
			</div>
			<form class="form-group" @submit="joinGame()" @submit.prevent>
				<h3>Or Join A  Game</h3>
				<div class="input">
					<label>Room Code</label>
					<input v-model="code" autocomplete="off" autocorrect="off" spellcheck="false" />
				</div>
				<div class="input">
					<label>Name</label>
					<input v-model="name" />
				</div>
				<input type="submit" class="btn blue" value="Join" />
			</form>
		</div>
		<div class="notices">
			<span>Wolf Game v0.1</span>
			<span><a @click="showStats = true">Stats</a></span>
			<span><a href="/credits.html" target="_blank">Credits</a></span>
		</div>
		<PopOver :show="showStats" @hide="showStats = false">
			<h2>Current Stats</h2>
			<p v-if="game.stats">{{game.stats.activeGames}} Games</p>
			<p v-if="game.stats">{{game.stats.activePlayers}} Players</p>
		</PopOver>
	</div>
</template>

<style lang="scss" scoped>
	#init {
		display: flex;
		flex-direction: column;
	}
	.form-view {
		flex-grow: 1;
	}
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
	.notices {
		padding: 20px;
		font-size: 20px;
		span, a {
			color: #CCC;
		}
		a {
			text-decoration: underline;
			&:hover {
				color: #000000;
			}
		}
		& > *:before {
			content: "• ";
		}
		& > *:nth-child(1):before {
			content: "";
		}
	}
</style>