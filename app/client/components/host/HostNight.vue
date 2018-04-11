<script>
	import PlayerGroup from '../common/PlayerGroup.vue'
	import TitleCard from '../common/TitleCard.vue'
	import Shadow from './village/Shadow.vue'
	export default {
		name: 'HostNight',
		components: { PlayerGroup, TitleCard, Shadow }
	}
</script>

<template>
	<div id="host-night">
		<!-- <TitleCard :text="`Night ${$root.game.game.day + 1}`" /> -->
		<h1 class="fixed-state-header">Night {{ $root.game.game.day + 1 }}</h1>
		<div class="players">
			<PlayerGroup :players="$root.game.game.players" />
		</div>
	</div>
</template>
