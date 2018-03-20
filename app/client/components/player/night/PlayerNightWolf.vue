<script>
	import PlayerList from '../../common/PlayerList.vue'
	export default {
		name: 'PlayerNightWolf',
		components: { PlayerList },
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
			}
		},
		methods: {
			wolfKill(player) {
				this.game.client.wolfKill(player.id)
			}
		}
	}
</script>

<template>
	<div id="PlayerNightWolf" class="view">
		<h1>Night {{ $root.game.game.day + 1 }}</h1>
		<p>Select your target</p>
		<PlayerList
			@select="wolfKill($event)"
			:players="potentialVictims"
		/>
	</div>
</template>
