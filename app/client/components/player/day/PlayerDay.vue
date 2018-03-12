<script>
	import PlayerAccusation from './PlayerAccusation.vue'
	import PlayerVote from './PlayerVote.vue'
	export default {
		name: 'PlayerDay',
		props: ['game'],
		components: { PlayerAccusation, PlayerVote }
	}
</script>

<template>
	<div id="PlayerDay">
		<PlayerAccusation></PlayerAccusation>
		<PlayerVote></PlayerVote>
	</div>
</template>
