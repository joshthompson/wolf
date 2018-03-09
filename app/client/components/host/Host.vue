<script>
	import Village from './village/Village.vue';
	import HostSetup from './HostSetup.vue';
	import HostIntro from './HostIntro.vue';
	import MessageView from '../common/MessageView.vue'
	export default {
		name: 'host',
		props: ['game'],
		components: { Village, HostSetup, HostIntro, MessageView },
		data() {
			return {
				states: ['SETUP', 'INTRO']
			}
		}
	}
</script>

<template>
	<div id="host">
		<a @click="game.endGame()" class="endGameBtn">X</a>
		<Village :time="game.time" :refresh="game.refresh">
			<HostSetup v-if="game.game.state === 'SETUP'" :game="game"></HostSetup>
			<HostIntro v-if="game.game.state === 'INTRO'" :game="game"></HostIntro>
			<MessageView
				v-if="!states.includes(game.game.state)"
				:title="'Error'"
				:message="`Unknown game state: ${game.game.state}`"
			></MessageView>
		</Village>
	</div>
</template>

<style lang="scss" scoped>
	.endGameBtn {
		$margin: 10px;
		$size: 32px;
		float: right;
		color: black;
		background: white;
		border-radius: $size / 2;
		width: $size;
		height: $size;
		margin: $margin $margin 0px (-$size - $margin);
		line-height: 38px;
		position: relative;
		z-index: 100;
		&:hover {
			opacity: 0.85;
		}
	}
</style>