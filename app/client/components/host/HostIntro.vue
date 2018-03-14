<script>
	import Avatar from '../common/Avatar.vue'
	import Shadow from './village/Shadow.vue'
	export default {
		name: 'HostSetup',
		props: ['game'],
		components: { Avatar, Shadow }
	}
</script>

<template>
	<div id="host-setup">
		<h1>Check your device</h1>
		<div class="players">
			<avatar v-for="player in game.game.players" :key="player.id" :player="player" class="village-object"></avatar>
		</div>
	</div>
</template>
