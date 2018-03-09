<script>
	import PlayerSetup from './PlayerSetup.vue'
	import PlayerIntro from './PlayerIntro.vue'
	import MessageView from '../common/MessageView.vue'
	export default {
		name: 'player',
		props: ['game'],
		components: { PlayerSetup, PlayerIntro, MessageView },
		data() {
			return {
				states: ['SETUP', 'INTRO']
			}
		}
	}
</script>

<template>
	<div id="player" :colour="game.player.id % 3">
		<PlayerSetup :game="game" v-if="game.game.state === 'SETUP'"></PlayerSetup>
		<PlayerIntro :game="game" v-if="game.game.state === 'INTRO'"></PlayerIntro>
		<MessageView
			v-if="!states.includes(game.game.state)"
			:title="'Error'"
			:message="`Unknown game state: ${game.game.state}`"
		></MessageView>
	</div>
</template>

<style lang="scss" scoped>
	#player[colour='0'] { background: #35D835; }
	#player[colour='1'] { background: #2BA8CE; }
	#player[colour='2'] { background: #DBDE2C; }
</style>
