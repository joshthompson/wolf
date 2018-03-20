<script>
	import ButtonList from '../../common/ButtonList.vue'
	export default {
		name: 'PlayerNightWolf',
		components: { ButtonList },
		computed: {
			game() {
				return this.$root.game
			},
			player() {
				return this.game.player
			},
			wolves() {
				return this.player.data.wolves
			},
			potentialVictims() {
				return this.game.game.players.filter(p => {
					const isSelf = p.id === this.player.id
					const isWolf = this.wolves.filter(w => w.id === p.id).length
					return !isSelf && !isWolf
				})
			},
			potentialVictimsButton() {
				return this.potentialVictims.map(victim => ({
					value: victim.id,
					text: victim.name,
					badge: this.game.votes ? this.game.votes[victim.id] || null : null
				}))
			}
		},
		methods: {
			wolfKill(player) {
				this.game.client.wolfKill(player)
			}
		}
	}
</script>

<template>
	<div id="PlayerNightWolf" class="view">
		<h1>Night {{ $root.game.game.day + 1 }}</h1>
		<p>Select your target</p>
		<ButtonList
			@select="wolfKill($event)"
			:options="potentialVictimsButton"
		/>
	</div>
</template>
