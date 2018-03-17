<script>
	export default {
		name: 'PlayerList',
		props: {
			text: String,
			seconds: {
				default: 3,
				type: Number
			}
		}
	}
</script>

<template>
	<div class="title-card">
		<h1>{{ text }}</h1>
	</div>
</template>
