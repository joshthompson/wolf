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
	<div id="player">
		<PlayerSetup :game="game" v-if="game.game.state === 'SETUP'"></PlayerSetup>
		<PlayerIntro :game="game" v-if="game.game.state === 'INTRO'"></PlayerIntro>
		<MessageView
			v-if="!states.includes(game.game.state)"
			:title="'Error'"
			:message="`Unknown game state: ${game.game.state}`"
		></MessageView>
	</div>
</template>
