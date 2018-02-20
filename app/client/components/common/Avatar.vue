<script>
	export default {
		name: 'avatar',
		props: ['player']
	}
</script>

<template>
	<div style="display: inline-block; padding: 20px;">
		<h1>😊</h1>
		<h2>Player: {{ player.name }}</h2>
	</div>
</template>
