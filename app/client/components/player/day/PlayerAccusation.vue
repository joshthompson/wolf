<script>
	import ButtonList from '../../common/ButtonList.vue'
	export default {
		name: 'PlayerAccusation',
		components: { ButtonList },
		data() {
			return {
				accusation: null
			}
		},
		methods: {
			accuse(player) {
				this.accusation = player
				this.$root.game.client.accuse(player.id)
			},
			withdraw() {
				this.accusation = null
				this.$root.game.client.withdrawAccusation()
			},
			accusations(id) {
				const count = this.$root.game.game.accusations.filter(accusation => accusation.vote === id)
				return count.length ? count.length : null
			}
		},
		computed: {
			accusationButtons() {
				return this.$root.game.game.players.map(player => ({
					value: player,
					text: player.name,
					badge: this.accusations(player.id)
				}))
			}
		}
	}
</script>

<template>
	<div id="PlayerAccusation" class="view">
		<h1>{{ $root.game.player.name }}</h1>
		<h2 v-if="!accusation">Make an accusations</h2>
		<div v-if="accusation">
			<h2 v-if="accusation.id !== $root.game.player.id">You have accused {{ accusation.name }}</h2>
			<h2 v-if="accusation.id === $root.game.player.id">You have accused... yourself</h2>
			<button @click="withdraw()" class="btn">Withdraw Accusation</button>
			<h2>Or change it</h2>
		</div>
		<ButtonList
			@select="accuse($event)"
			:options="accusationButtons"
		/>
	</div>
</template>

<style lang="scss" scoped>
	h2 {
		padding: 0px 20px;
	}
</style>
