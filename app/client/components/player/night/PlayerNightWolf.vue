<script>
	import PlayerList from '../../common/PlayerList.vue'
	export default {
		name: 'PlayerNightWolf',
		components: { PlayerList },
		computed: {
			game() {
				return this.$root.game.game
			},
			player() {
				return this.$root.game.player
			},
			potentialVictims() {
				return this.$root.game.game.players.filter(player => {
					const isSelf = player.id === this.player.id
					const isWolf = this.player.data.wolves.filter(wolf => wolf.id === player.id).length === 1
					return !isSelf && !isWolf
				})
			}
		}
	}
</script>

<template>
	<div id="PlayerNightWolf" class="view">
		<h1>Night {{ $root.game.game.day + 1 }}</h1>
		<p>Select your target</p>
		<PlayerList :players="potentialVictims" />
	</div>
</template>
