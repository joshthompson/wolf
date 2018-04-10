<script>
	import PlayerGroup from '../common/PlayerGroup.vue'
	import CountdownTimer from '../common/CountdownTimer.vue'
	export default {
		name: 'HostSetup',
		components: { PlayerGroup, CountdownTimer },
		data() {
			return {
				startCountdown: false
			}
		},
		computed: {
			readyPlayers() {
				return this.game.game.players.filter(player => player.state === 'READY').length
			},
			game() {
				return this.$root.game
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
	<div id="host-setup">
		
		<h1 v-if="!startCountdown">Game Code: {{ game.game.code }}</h1>
		<h1 v-if="startCountdown">
			<CountdownTimer
				:value="startCountdown"
				:speed="1000"
				@complete="game.host.startGame()"
			/>
		</h1>
		
		<div class="players">
			<PlayerGroup :players="game.game.players" />
		</div>
		<p v-if="readyPlayers < game.game.minPlayers">You need at least {{ game.game.minPlayers }} players to join</p>
		<div v-if="readyPlayers >= game.game.minPlayers">
			<button v-if="startCountdown === false" class="btn" @click="startGame()">Start Game</button>
			<button v-if="startCountdown" class="btn" @click="cancelStartGame()">Cancel</button>
		</div>
		
	</div>
</template>
