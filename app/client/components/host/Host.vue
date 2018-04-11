<script>
	import Village from './village/Village.vue'
	import HostSetup from './HostSetup.vue'
	import HostIntro from './HostIntro.vue'
	import HostNight from './HostNight.vue'
	import HostDay from './HostDay.vue'
	import MessageView from '../common/MessageView.vue'
	export default {
		name: 'host',
		components: { Village, HostSetup, HostIntro, HostNight, HostDay, MessageView },
		data() {
			return {
				states: ['SETUP', 'INTRO', 'NIGHT', 'DAY']
			}
		},
		computed: {
			game() {
				return this.$root.game.game
			}
		},
		methods: {
			endGame() {
				this.$root.game.endGame()
			}
		}
	}
</script>

<template>
	<div id="host">
		<a @click="endGame()" class="endGameBtn"></a>
		<Village>
			<HostSetup v-if="game.state === 'SETUP'" />
			<HostIntro v-if="game.state === 'INTRO'" />
			<HostNight v-if="game.state === 'NIGHT'" />
			<HostDay v-if="game.state === 'DAY'" />
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
	.sky-text {
		z-index: 10000;
		position: relative;
	}
</style>
