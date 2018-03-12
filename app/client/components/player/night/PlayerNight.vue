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
		<PlayerNightCupid :game="game"></PlayerNightCupid>
		<PlayerNightDevil :game="game"></PlayerNightDevil>
		<PlayerNightElder :game="game"></PlayerNightElder>
		<PlayerNightSeer :game="game"></PlayerNightSeer>
		<PlayerNightVillager :game="game"></PlayerNightVillager>
		<PlayerNightWolf :game="game"></PlayerNightWolf>
	</div>
</template>
