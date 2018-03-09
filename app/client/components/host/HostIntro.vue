<script>
	import Avatar from '../common/Avatar.vue'
	export default {
		name: 'HostSetup',
		props: ['game'],
		components: { Avatar }
	}
</script>

<template>
	<div id="host-setup">
		<div class="players">
			<avatar v-for="player in game.game.players" :key="player.name" :player="player" class="village-object"></avatar>
		</div>
	</div>
</template>