<script>
	export default {
		name: 'MessageView',
		props: ['title', 'message']
	}
</script>

<template>
	<div class="view">
		<h1>{{ title }}</h1>
		<p>{{ message }}</p>
	</div>
</template>

<style lang="scss">
	p {
		font-size: 32px;
		padding: 20px;
	}
</style>