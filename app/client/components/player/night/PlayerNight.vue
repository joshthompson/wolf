<script>
	import PlayerNightCupid from './PlayerNightCupid.vue'
	import PlayerNightDevil from './PlayerNightDevil.vue'
	import PlayerNightElder from './PlayerNightElder.vue'
	import PlayerNightSeer from './PlayerNightSeer.vue'
	import PlayerNightVillager from './PlayerNightVillager.vue'
	import PlayerNightWolf from './PlayerNightWolf.vue'
	export default {
		name: 'PlayerNight',
		props: ['game'],
		components: {
			PlayerNightCupid,
			PlayerNightDevil,
			PlayerNightElder,
			PlayerNightSeer,
			PlayerNightVillager,
			PlayerNightWolf
		}
	}
</script>

<template>
	<div id="PlayerNight">
		<PlayerNightCupid    :game="game" v-if="game.player.character.type === 'cupid'"></PlayerNightCupid>
		<PlayerNightDevil    :game="game" v-if="game.player.character.type === 'devil'"></PlayerNightDevil>
		<PlayerNightElder    :game="game" v-if="game.player.character.type === 'elder'"></PlayerNightElder>
		<PlayerNightSeer     :game="game" v-if="game.player.character.type === 'seer'"></PlayerNightSeer>
		<PlayerNightVillager :game="game" v-if="game.player.character.type === 'villager'"></PlayerNightVillager>
		<PlayerNightWolf     :game="game" v-if="game.player.character.type === 'wolf'"></PlayerNightWolf>
	</div>
</template>
