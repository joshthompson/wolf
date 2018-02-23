<script>
	import Avatar from '../common/Avatar.vue';
	export default {
		name: 'host',
		props: ['game'],
		components: { Avatar }
	}
</script>

<template>
	<div id="host" class="view">
		<h1>Join Game: {{ game.game.code }}</h1>

		<div class="forest">
			<div class="trees">🌲🌲🌲🌲🌲🌲🌲</div>
			<div class="trees">🌲🌲🌲🌲🌲🌲🌲🌲</div>
		</div>
		<div class="players">
			<avatar v-for="player in game.game.players" :player="player"></avatar>
		</div>
		<!-- <div class="sky">

		<div class="trees">🌲🌲🌲🌲🌲🌲🌲🌲</div>
			<h1 style="font-size: 72px;">🐺</h1>
			<h1 style="font-size: 82px; margin: -145px 0px 0px 0px;">🌙</h1>
			<div class="ground"></div>
		</div> -->
	</div>
</template>

<style lang="scss" scoped>
	.forest {
		margin-top: 80px;
		.trees {
			font-size: 72px;
			&:nth-child(2) {
				margin-top: -80px;
			}
		}
	}
</style>