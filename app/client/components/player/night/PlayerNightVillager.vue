<script>
	export default {
		name: 'PlayerNightVillager'
	}
</script>

<template>
	<div id="PlayerNightVillager" class="view">
		<h1>Night {{ $root.game.game.day + 1 }}</h1>
		<p>Night time villager stuff</p>
		<p>- Random question / tasks</p>
		<p>- Dream</p>
	</div>
</template>
