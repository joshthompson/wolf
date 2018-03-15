<script>
	export default {
		name: 'PlayerNightElder',
		props: ['game']
	}
</script>

<template>
	<div id="PlayerNightElder" class="view">
		<h1>Night {{ game.game.day + 1 }}</h1>
		<p>Night time elder stuff</p>
		<p>- Same as villager</p>
	</div>
</template>
