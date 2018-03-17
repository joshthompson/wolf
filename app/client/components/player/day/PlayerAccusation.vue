<script>
	export default {
		name: 'PlayerAccusation',
		data() {
			return {
				accusation: null
			}
		},
		method: {
			accuse(player) {
				this.accusation = player
				this.$root.game.client.accuse(player)
			},
			withdraw() {
				this.accusation = null
				this.$root.game.client.withrawAccusation()
			}
		}
	}
</script>

<template>
	<div id="PlayerAccusation" class="view">
		<h1>{{ $root.game.player.name }}</h1>

		<div v-if="!accusation">
			<h2>Make an accusations</h2>
			<button
				class="btn"
				v-for="player in $root.game.game.players"
				:key="player.id"
				@click="accuse(player)"
			>{{ player.name }}</button>
		</div>

		<div v-if="accusation">
			<h2>You have accused</h2>
			<div>{{ accusation.name }}</div>
			<button @click="withdraw()">Withdraw Accusation</button>
		</div>
	</div>
</template>
