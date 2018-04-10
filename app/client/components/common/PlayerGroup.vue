<script>
	import PlayerAvatar from './PlayerAvatar.vue'
	export default {
		name: 'PlayerGroup',
		props: {
			players: Object
		},
		components: { PlayerAvatar }
	}
</script>

<template>
	<div class="player-group">
		<PlayerAvatar
			v-for="player in players"
			:key="player.id"
			:player="player"
			class="player"
		/>
	</div>
</template>

<style lang="scss" scoped>
	.player-group {
		.player {
			vertical-align: top;
			margin: 0px 0px;
			&:nth-child(2n) {
				margin: 30px 0px 0px;
			}
		}
	}
</style>
