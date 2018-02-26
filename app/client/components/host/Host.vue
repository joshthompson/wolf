<script>
	import HostSetup from './HostSetup.vue';
	import MessageView from '../common/MessageView.vue'
	export default {
		name: 'host',
		props: ['game'],
		components: { HostSetup, MessageView }
	}
</script>

<template>
	<div id="host" class="view">
		<a @click="game.endGame()" class="endGameBtn">X</a>
		<HostSetup v-if="game.game.state === 'SETUP'" :game="game"></HostSetup>
		<MessageView v-if="game.game.state !== 'SETUP'" :title="'Error'" :message="`Unknown game state: ${game.game.state}`"></MessageView>
	</div>
</template>

<style lang="scss" scoped>
	.endGameBtn {
		float: right;
		color: black;
		background: white;
		border-radius: 16px;
		width: 32px;
		height: 32px;
		margin: 10px 10px 0px -32px;
		line-height: 38px;
		&:hover {
			opacity: 0.85;
		}
	}
</style>