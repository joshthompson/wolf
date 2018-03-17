<script>
	export default {
		name: 'PlayerNightSeer'
	}
</script>

<template>
	<div id="PlayerNightSeer" class="view">
		<h1>Night {{ $root.game.game.day + 1 }}</h1>
		<p>Night time seer stuff</p>
		<p>- Choose player to reveal identity</p>
	</div>
</template>
