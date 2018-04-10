<script>
	import PlayerAvatar from '../common/PlayerAvatar.vue'
	import PlayerGroup from '../common/PlayerGroup.vue'
	import TitleCard from '../common/TitleCard.vue'
	import Shadow from './village/Shadow.vue'
	export default {
		name: 'HostDay',
		components: { PlayerAvatar, PlayerGroup, TitleCard, Shadow },
		computed: {
			game() {
				return this.$root.game.game
			},
			accused() {
				return this.game.players.filter(player => {
					return this.game.accusations.filter(accusation => {
						return accusation.vote === player.id
					}).length ? true : false
				})
			},
			accusations() {
				let acc = this.accused.map(player => ({
					accused: player,
					accusers: this.game.accusations
						.filter(accusation => accusation.vote === player.id)
						.map(accusation => this.game.players.filter(accuser => {
							return accusation.voter === accuser.id
						})[0])
				}))
				return acc
			},
			neutralPlayers() {
				return this.game.players.filter(player => {
					return this.game.accusations.filter(accusation => {
						return accusation.voter === player.id
					}).length ? false : true
				})
			}
		}
	}
</script>

<template>
	<div id="host-day">
		<!-- <TitleCard :text="`Day ${game.day + 1}`" /> -->
		<h1>Day {{ $root.game.game.day + 1 }}</h1>
		<div class="avatar-group">
			<div v-for="accusation in accusations">
				<div class="sign">
					<PlayerAvatar
						:player="accusation.accused"
						class="village-object"
						mode="icon"
					/>
				</div>
				<PlayerGroup :players="accusation.accusers" />
			</div>
			<div class="players">
				<PlayerGroup :players="neutralPlayers" />
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	.avatar-group > * {
		display: inline-block;
		margin: 0px 50px;
	}
	.sign {
		background: #FFFFFF;
		padding: 5px 10px;
		margin: 0px auto;
		width: 100px;
		height: 100px;
		border: 2px solid #000000;
		&:after {
			content: "";
			display: block;
			margin: 0px auto;
			height: 20px;
			width: 4px;
			background: #000
		}
	}
</style>
