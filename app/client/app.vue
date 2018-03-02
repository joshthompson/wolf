<script>
	import Init from './components/init/Init.vue'
	import Host from './components/host/Host.vue'
	import Player from './components/player/Player.vue'
	import Spelunker from './components/common/Spelunker.vue'
	import ShopKeeper from './components/common/ShopKeeper.vue'
	export default {
		name: 'app',
		props: ['game'],
		components: { Init, Host, Player, Spelunker, ShopKeeper }
	}
</script>

<template>
	<div id="app">
		<Spelunker></Spelunker>
		<ShopKeeper></ShopKeeper>
		<init   :game="game" v-if="game.mode === null"></init>
		<host   :game="game" v-if="game.mode === 'host'"></host>
		<player :game="game" v-if="game.mode === 'player'"></player>
	</div>
</template>

<style lang="scss">
	@import 'style.scss';
</style>
