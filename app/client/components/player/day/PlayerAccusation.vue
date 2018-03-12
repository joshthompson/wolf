<script>
	export default {
		name: 'PlayerAccusation',
		props: ['game'],
		data() {
			return {
				accusation: null
			}
		},
		method: {
			accuse(player) {
				this.accusation = player
				this.game.client.accuse(player)
			},
			withdraw() {
				this.accusation = null
				this.game.client.withrawAccusation()
			}
		}
	}
</script>

<template>
	<div id="PlayerAccusation" class="view">
		<h1>{{ game.player.name }}</h1>

		<div v-if="!accusation">
			<h2>Make an accusations</h2>
			<button @click="accuse(player)" class="btn" v-for="player in game.game.players" :key="player.id">{{ player.name }}</button>
		</div>

		<div v-if="accusation">
			<h2>You have accused</h2>
			<div>{{ accusation.name }}</div>
			<button @click="withdraw()">Withdraw Accusation</button>
		</div>
	</div>
</template>
