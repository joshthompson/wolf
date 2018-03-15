<script>
	export default {
		name: 'PlayerNightWolf',
		props: ['game']
	}
</script>

<template>
	<div id="PlayerNightWolf" class="view">
		<h1>Night {{ game.game.day + 1 }}</h1>

		<!-- <PlayerList :players=""></PlayerList> -->
		<p>Night time wolf stuff</p>
		<p>- Pick someone to kill</p>
		<p>- Wait for see other wolf votes</p>
		<p>- Agree?</p>
	</div>
</template>
