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
		<TitleCard :text="`Night ${game.game.day + 1}`" />
		<PlayerNightCupid v-if="game.player.character.type === 'cupid'" />
		<PlayerNightDevil v-if="game.player.character.type === 'devil'" />
		<PlayerNightElder v-if="game.player.character.type === 'elder'" />
		<PlayerNightSeer v-if="game.player.character.type === 'seer'" />
		<PlayerNightVillager v-if="game.player.character.type === 'villager'" />
		<PlayerNightWolf v-if="game.player.character.type === 'wolf'" />
	</div>
</template>
