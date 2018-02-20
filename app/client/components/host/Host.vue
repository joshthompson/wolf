<script>
	import Avatar from '../common/Avatar.vue';
	export default {
		name: 'host',
		props: ['game'],
		components: { Avatar }
	}
</script>

<template>
	<div id="host">
		<h1>Game Code: {{ game.game.code }}</h1>
		<h1>Players: {{ game.game.players.length }}</h1>

		<avatar v-for="player in game.game.players" :player="player"></avatar>
		<!-- <div class="sky">
			<h1 style="font-size: 72px;">🐺</h1>
			<h1 style="font-size: 82px; margin: -145px 0px 0px 0px;">🌙</h1>
			<h1 style="font-size: 72px; margin: -40px 0px 0px 0px;">🌲🌲🌲🌲🌲🌲🌲</h1>
			<h1 style="font-size: 72px; margin: -80px 0px 0px 0px;">🌲🌲🌲🌲🌲🌲🌲🌲</h1>
			<div class="ground"></div>
		</div> -->
	</div>
</template>
