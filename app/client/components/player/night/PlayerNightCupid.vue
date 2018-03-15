<script>
	export default {
		name: 'PlayerNightCupid',
		props: ['game']
	}
</script>

<template>
	<div id="PlayerNightCupid" class="view">
		<h1>Night {{ game.game.day + 1 }}</h1>
		<p>Night time cupid stuff</p>
		<p>- First night, pick lovers</p>
		<p>- After lovers are picked act like villager</p>
	</div>
</template>
