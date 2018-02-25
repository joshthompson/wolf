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
		<HostSetup v-if="game.game.state === 'SETUP'" :game="game"></HostSetup>
		<MessageView v-if="game.game.state !== 'SETUP'" :title="'Error'" :message="`Unknown game state: ${game.game.state}`"></MessageView>
	</div>
</template>

<style lang="scss" scoped>
</style>