<script>
	import PlayerAvatar from '../common/PlayerAvatar.vue'
	import Shadow from './village/Shadow.vue'
	export default {
		name: 'HostSetup',
		components: { PlayerAvatar, Shadow }
	}
</script>

<template>
	<div id="host-setup">
		<h1>Check your device</h1>
		<div class="players">
			<PlayerAvatar
				v-for="player in $root.game.game.players"
				:key="player.id"
				:player="player"
				class="village-object"
			/>
		</div>
	</div>
</template>
