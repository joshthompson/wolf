<script>
	import Init from './components/init/Init.vue';
	import Host from './components/host/Host.vue';
	import Play from './components/play/Play.vue';

	export default {
		name: 'app',
		props: ['game'],
		components: { Init, Host, Play }
	};
</script>

<template>
	<div id="app">
		<init :game="game" v-if="game.mode === null"></init>
		<host :game="game" v-if="game.mode === 'host'"></host>
		<play :game="game" v-if="game.mode === 'player'"></play>
	</div>
</template>
