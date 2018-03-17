<script>
	import Init from './components/init/Init.vue';
	import Host from './components/host/Host.vue';
	import Player from './components/player/Player.vue';
	export default {
		name: 'app',
		components: { Init, Host, Player }
	}
</script>

<template>
	<div id="app">
		<init   v-if="$root.game.mode === null" />
		<host   v-if="$root.game.mode === 'host'" />
		<player v-if="$root.game.mode === 'player'" />
	</div>
</template>

<style lang="scss">
	@import 'style/style.scss';
</style>
