<script>
	import Avatar from '../common/Avatar.vue';
	export default {
		name: 'host',
		props: ['game'],
		components: { Avatar },
		data() {
			return {
				timer: null
			}
		},
		computed: {
			readyPlayers() {
				return this.game.game.players.filter(player => player.state === 'READY').length
			}
		},
		methods: {
			startGame() {
				this.timer = 3
				setTimeout(this.startGameCountdown, 1000)
			},
			startGameCountdown() {
				if (this.timer !== null) {
					this.timer--
					if (this.timer === 0) {
						this.timer = 'Go!'
						this.game.host.startGame()
					} else {
						setTimeout(this.startGameCountdown, 1000)
					}
				}
			},
			cancelStartGame() {
				this.timer = null
			}
		}
	}
</script>

<template>
	<div id="host" class="view">
		<h1>
			<span>Join Game: {{ game.game.code }}</span>
			<a @click="game.endGame()">X</a>
		</h1>
		<div class="forest">
			<div class="trees">🌲🌲🌲🌲🌲🌲🌲</div>
			<div class="trees">🌲🌲🌲🌲🌲🌲🌲🌲</div>
		</div>
		<div class="players">
			<avatar v-for="player in game.game.players" :player="player"></avatar>
		</div>
		<p v-if="readyPlayers < game.game.minPlayers">You need at least {{ game.game.minPlayers }} players to join</p>

		<div v-if="readyPlayers >= game.game.minPlayers">
			<button v-if="timer === null" class="btn" @click="startGame()">Start Game</button>
			<div class="countdown">{{ timer }}</div>
			<button v-if="timer !== null" class="btn" @click="cancelStartGame()">Cancel</button>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	#host {
		background: #E2CA7D;
		&:before {
			content: "";
			background: #9BD0E2;
			display: block;
			height: 200px;
			margin-bottom: -200px;
		}
	}
	.countdown {
		font-size: 72px;
	}
	.forest {
		margin-top: 80px;
		.trees {
			font-size: 72px;
			&:nth-child(2) {
				margin-top: -80px;
			}
		}
	}
</style>
