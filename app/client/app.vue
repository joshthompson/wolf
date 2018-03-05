<script>
	import Init from './components/init/Init.vue';
	import Host from './components/host/Host.vue';
	import Player from './components/player/Player.vue';
	import Sky from './components/host/Sky.vue';
	export default {
		name: 'app',
		props: ['game'],
		components: { Init, Host, Player, Sky }

		,data() {
			return {
				time: 0
			}
		},
		created() {
			setTimeout(this.timer, 50)
		},
		methods: {
			timer() {
				this.time = (this.time + Math.PI / 10) % 24
				setTimeout(this.timer, 50)
			}
		}
	}
</script>

<template>
	<div id="app">
		<init   :game="game" v-if="game.mode === null"></init>
		<host   :game="game" v-if="game.mode === 'host'"></host>
		<player :game="game" v-if="game.mode === 'player'"></player>
	</div>
</template>

<style lang="scss">
	@import 'style/style.scss';
</style>
