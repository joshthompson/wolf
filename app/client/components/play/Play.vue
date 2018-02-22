<script>
	export default {
		name: 'play',
		props: ['game']
	}
</script>

<template>
	<div id="play" class="view">
		<h1>{{game.player.name}}</h1>
		<p>Welcome!</p>
		<p>Please wait...</p>
	</div>
</template>
