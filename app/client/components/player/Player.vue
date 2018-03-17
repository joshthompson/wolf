<script>
	import PlayerSetup from './before/PlayerSetup.vue'
	import PlayerIntro from './before/PlayerIntro.vue'
	import PlayerNight from './night/PlayerNight.vue'
	import PlayerDay from './day/PlayerDay.vue'
	import MessageView from '../common/MessageView.vue'
	export default {
		name: 'Player',
		components: { PlayerSetup, PlayerIntro, PlayerNight, PlayerDay, MessageView },
		data() {
			return {
				states: ['SETUP', 'INTRO', 'NIGHT', 'DAY']
			}
		},
		computed: {
			game() {
				return this.$root.game
			}
		}
	}
</script>

<template>
	<div id="Player" :colour="game.player.id % 5">
		<PlayerSetup v-if="game.game.state === 'SETUP'"></PlayerSetup>
		<PlayerIntro v-if="game.game.state === 'INTRO'"></PlayerIntro>
		<PlayerNight v-if="game.game.state === 'NIGHT'"></PlayerNight>
		<PlayerDay v-if="game.game.state === 'DAY'"></PlayerDay>
		<MessageView
			v-if="!states.includes(game.game.state)"
			:title="'Error'"
			:message="`Unknown game state: ${game.game.state}`"
		></MessageView>
	</div>
</template>

<style lang="scss" scoped>
	#Player[colour='0'] { background: #35D835; }
	#Player[colour='1'] { background: #2BA8CE; }
	#Player[colour='2'] { background: #DBDE2C; }
	#Player[colour='3'] { background: #CA5321; }
	#Player[colour='4'] { background: #8D21CA; }
</style>
