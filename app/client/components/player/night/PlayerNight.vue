<script>
	import TitleCard from '../../common/TitleCard.vue'
	import PlayerNightCupid from './PlayerNightCupid.vue'
	import PlayerNightDevil from './PlayerNightDevil.vue'
	import PlayerNightElder from './PlayerNightElder.vue'
	import PlayerNightSeer from './PlayerNightSeer.vue'
	import PlayerNightVillager from './PlayerNightVillager.vue'
	import PlayerNightWolf from './PlayerNightWolf.vue'
	export default {
		name: 'PlayerNight',
		components: {
			TitleCard,
			PlayerNightCupid,
			PlayerNightDevil,
			PlayerNightElder,
			PlayerNightSeer,
			PlayerNightVillager,
			PlayerNightWolf
		},
		computed: {
			game() {
				return this.$root.game
			}
		}
	}
</script>

<template>
	<div id="PlayerNight">
		<TitleCard :text="`Night ${game.game.day + 1}`"></TitleCard>
		<PlayerNightCupid    v-if="game.player.character.type === 'cupid'"></PlayerNightCupid>
		<PlayerNightDevil    v-if="game.player.character.type === 'devil'"></PlayerNightDevil>
		<PlayerNightElder    v-if="game.player.character.type === 'elder'"></PlayerNightElder>
		<PlayerNightSeer     v-if="game.player.character.type === 'seer'"></PlayerNightSeer>
		<PlayerNightVillager v-if="game.player.character.type === 'villager'"></PlayerNightVillager>
		<PlayerNightWolf     v-if="game.player.character.type === 'wolf'"></PlayerNightWolf>
	</div>
</template>
