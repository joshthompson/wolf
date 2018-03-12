<script>
	import PlayerSetup from './before/PlayerSetup.vue'
	import PlayerIntro from './before/PlayerIntro.vue'
	import PlayerNight from './night/PlayerNight.vue'
	import PlayerDay from './day/PlayerDay.vue'
	import MessageView from '../common/MessageView.vue'
	export default {
		name: 'Player',
		props: ['game'],
		components: { PlayerSetup, PlayerIntro, PlayerNight, PlayerDay, MessageView },
		data() {
			return {
				states: ['SETUP', 'INTRO', 'NIGHT', 'DAY']
			}
		}
	}
</script>

<template>
	<div id="Player" :colour="game.player.id % 5">
		<PlayerSetup :game="game" v-if="game.game.state === 'SETUP'"></PlayerSetup>
		<PlayerIntro :game="game" v-if="game.game.state === 'INTRO'"></PlayerIntro>
		<PlayerNight :game="game" v-if="game.game.state === 'NIGHT'"></PlayerNight>
		<PlayerDay :game="game" v-if="game.game.state === 'DAY'"></PlayerDay>
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
