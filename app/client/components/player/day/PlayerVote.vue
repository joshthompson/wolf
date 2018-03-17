<script>
	export default {
		name: 'PlayerVote',
		data() {
			return {
				voted: false,
				vote: null
			}
		},
		method: {
			vote(player) {
				this.vote = player
				this.voted = true
				this.$root.game.client.vote(player)
			}
		}
	}
</script>

<template>
	<div id="PlayerVote" class="view">
		<h1>{{ $root.game.player.name }}</h1>

		<div v-if="!voted">
			<h2>Who dies</h2>
			<button @click="accuse(player)" class="btn" v-for="player in $root.game.game.accusations" :key="player.id">{{ player.name }}</button> -->
			<button @click="vote(null)">Abstain</button>
		</div>

		<div v-if="voted && vote">
			<h2>You have voted for</h2>
			<div>{{ vote.name }}</div>
		</div>

		<div v-if="voted && !vote">
			<h2>You have chosen to abstain</h2>
		</div>
	</div>
</template>
