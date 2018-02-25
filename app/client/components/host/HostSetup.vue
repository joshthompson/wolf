<script>
	import Avatar from '../common/Avatar.vue';
	import Countdown from '../common/Countdown.vue';
	export default {
		name: 'HostSetup',
		props: ['game'],
		components: { Avatar, Countdown },
		data() {
			return {
				startCountdown: false
			}
		},
		computed: {
			readyPlayers() {
				return this.game.game.players.filter(player => player.state === 'READY').length
			}
		},
		methods: {
			startGame() {
				this.startCountdown = 3
			},
			cancelStartGame() {
				this.startCountdown = false
			}
		}
	}
</script>

<template>
	<div id="host-setup" class="view">
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
			<button v-if="startCountdown === false" class="btn" @click="startGame()">Start Game</button>
			<countdown v-if="startCountdown" :value="startCountdown" :speed="1000" @complete="game.host.startGame()"></countdown>
			<button v-if="startCountdown" class="btn" @click="cancelStartGame()">Cancel</button>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	#host-setup {
		background: #E2CA7D;
		&:before {
			content: "";
			background: #9BD0E2;
			display: block;
			height: 200px;
			margin-bottom: -200px;
		}
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
