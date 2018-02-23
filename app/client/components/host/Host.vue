<script>
	import Avatar from '../common/Avatar.vue';
	export default {
		name: 'host',
		props: ['game'],
		components: { Avatar },
		computed: {
			readyPlayers() {
				return this.game.game.players.filter(player => player.state === 'READY').length
			}
		}
	}
</script>

<template>
	<div id="host" class="view">
		<h1>Join Game: {{ game.game.code }}</h1>
		<div class="forest">
			<div class="trees">🌲🌲🌲🌲🌲🌲🌲</div>
			<div class="trees">🌲🌲🌲🌲🌲🌲🌲🌲</div>
		</div>
		<div class="players">
			<avatar v-for="player in game.game.players" :player="player"></avatar>
		</div>
		<p v-if="readyPlayers < game.game.minPlayers">You need at least {{ game.game.minPlayers }} players to join</p>
		<button v-if="readyPlayers >= game.game.minPlayers" class="btn">Start Game</button>
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
