<script>
	export default {
		name: 'PlayerNightDevil',
		props: ['game']
	}
</script>

<template>
	<div id="PlayerNightDevil" class="view">
		<h1>Night {{ game.game.day + 1 }}</h1>
		<p>Night time devil stuff</p>
		<p>- Same as villager</p>
	</div>
</template>
