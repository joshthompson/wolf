<script>
	import Init from './components/init/Init.vue';
	import Host from './components/host/Host.vue';
	import Player from './components/player/Player.vue';
	
	export default {
		name: 'app',
		props: ['game'],
		components: { Init, Host, Player }
	};
</script>

<template>
	<div id="app">
		<init   :game="game" v-if="game.mode === null"></init>
		<host   :game="game" v-if="game.mode === 'host'"></host>
		<player :game="game" v-if="game.mode === 'player'"></player>
	</div>
</template>
