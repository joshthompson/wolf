<script>
	import PlayerList from '../../common/PlayerList.vue'
	export default {
		name: 'PlayerNightWolf',
		components: { PlayerList }
	}
</script>

<template>
	<div id="PlayerNightWolf" class="view">
		<h1>Night {{ $root.game.game.day + 1 }}</h1>
		<PlayerList :players="$root.game.game.players"></PlayerList>
		<p>Night time wolf stuff</p>
		<p>- Pick someone to kill</p>
		<p>- Wait for see other wolf votes</p>
		<p>- Agree?</p>
	</div>
</template>
