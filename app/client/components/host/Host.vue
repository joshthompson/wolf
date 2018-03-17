<script>
	import Village from './village/Village.vue'
	import HostSetup from './HostSetup.vue'
	import HostIntro from './HostIntro.vue'
	import HostNight from './HostNight.vue'
	import MessageView from '../common/MessageView.vue'
	export default {
		name: 'host',
		components: { Village, HostSetup, HostIntro, HostNight, MessageView },
		data() {
			return {
				states: ['SETUP', 'INTRO', 'NIGHT']
			}
		}
	}
</script>

<template>
	<div id="host">
		<a @click="$root.game.endGame()" class="endGameBtn"></a>
		<Village>
			<HostSetup v-if="$root.game.game.state === 'SETUP'" />
			<HostIntro v-if="$root.game.game.state === 'INTRO'" />
			<HostNight v-if="$root.game.game.state === 'NIGHT'" />
			<MessageView
				v-if="!states.includes($root.game.game.state)"
				:title="'Error'"
				:message="`Unknown game state: ${$root.game.game.state}`"
			/>
		</Village>
	</div>
</template>

<style lang="scss" scoped>
	$margin: 10px;
	$size: 32px;
	.endGameBtn {
		display: inline-block;
		background: url('/imgs/x.png');
		float: right;
		background-size: $size $size;
		width: $size;
		height: $size;
		border-radius: $size / 2;
		margin: $margin $margin 0px (-$size - $margin);
		position: relative;
		z-index: 100;
		&:hover {
			opacity: 0.85;
		}
	}
</style>