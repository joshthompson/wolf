<script>
	import PlayerSetup from './PlayerSetup.vue'
	import MessageView from '../common/MessageView.vue'

	export default {
		name: 'player',
		props: ['game'],
		components: { PlayerSetup, MessageView }
	}
</script>

<template>
	<div id="player">
		<PlayerSetup :game="game" v-if="game.game.state === 'SETUP'"></PlayerSetup>
		<MessageView v-if="game.game.state !== 'SETUP'" :title="'Error'" :message="`Unknown game state: ${game.game.state}`"></MessageView>
	</div>
</template>
