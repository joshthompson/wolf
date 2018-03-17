<script>
	import PlayerList from '../../common/PlayerList.vue'
	export default {
		name: 'PlayerNightWolf',
		components: { PlayerList },
		computed: {
			potentialVictims() {
				return this.$root.game.game.players.filter(player => {
					return player.id !== this.$root.game.player.id
					// TODO: Remove other wolves
				})
			}
		}
	}
</script>

<template>
	<div id="PlayerNightWolf" class="view">
		<h1>Night {{ $root.game.game.day + 1 }}</h1>
		<h2>Select your target</h2>
		<PlayerList :players="potentialVictims" />
	</div>
</template>
