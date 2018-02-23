<script>
	import PlayerSetup from './PlayerSetup.vue';

	export default {
		name: 'player',
		props: ['game'],
		components: { PlayerSetup }
	}
</script>

<template>
	<div id="player">
		<PlayerSetup :game="game" v-if="game.game.state === 'SETUP'"></PlayerSetup>
		<span v-if="game.game.state !== 'SETUP'">Unknown game state: {{ game.game.state }}</span>
	</div>
</template>
