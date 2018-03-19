<script>
	import PlayerAvatar from '../../common/PlayerAvatar.vue'
	export default {
		name: 'PlayerIntro',
		components: { PlayerAvatar },
		methods: {
			gotIt() {
				this.game.client.playerReady()
			}
		},
		computed: {
			description() {
				return this.game.player.character.description
			},
			icon() {
				return this.game.player.character.icon || `/imgs/avatars/${this.game.player.avatar}.png`
			},
			game() {
				return this.$root.game
			}
		}
	}
</script>

<template>
	<div id="PlayerIntro" class="view">
		<h1>You are...</h1>
		<div v-if="game.player.state !== 'READY'">

			<div class="icon">
				<img :src="icon" />
			</div>
			<div class="role">{{ game.player.character.title }}</div>
			<ul class="description">
				<li v-for="desc in description">{{ desc }}</li>
			</ul>

			<div v-if="game.player.character.type === 'wolf'">
				<p v-if="game.player.data.wolves.length === 1">You are the only wolf</p>
				<div v-if="game.player.data.wolves.length > 1" class="group">
					<h3>The wolf pack:</h3>
					<PlayerAvatar
						v-for="player in game.player.data.wolves"
						:key="player.id"
						:player="player"
						class="group-icon"
					/>
				</div>
			</div>

			<button @click="gotIt()" class="btn">Got it!</button>

		</div>
		<div v-if="game.player.state === 'READY'">
			<p>Waiting for other players</p>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	@import '../../../style/mixins.scss';
	.description {
		text-align: left;
		padding: 10px 10px 10px 30px;
		margin: 10px;
		@include box();
	}
	.icon {
		border: 2px solid black;
		width: 100px;
		height: 100px;
		border-radius: 50%;
		margin: 20px auto -12px;
		overflow: hidden;
		background: #FFFFFF;
		img {
			width: 85px;
    		margin: 8px 10px 0px 10px;
		}
	}
	.role {
		font-family: 'Permanent Marker', cursive;
		background: #000000;
		color: #FFFFFF;
		display: inline-block;
		padding: 5px 10px 2px;
	}
	.team {
		font-size: small;
	}
	.group {
		margin: 10px 10px 0px;
	}
	.group-icon {
		padding: 0px 10px;
	}
</style>
