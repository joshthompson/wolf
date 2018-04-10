<script>
	import PlayerGroup from '../common/PlayerGroup.vue'
	import Shadow from './village/Shadow.vue'
	export default {
		name: 'HostSetup',
		components: { PlayerGroup, Shadow }
	}
</script>

<template>
	<div id="host-setup">
		<h1>Check your device</h1>
		<div class="players">
			<PlayerGroup :players="$root.game.game.players" />
		</div>
	</div>
</template>
