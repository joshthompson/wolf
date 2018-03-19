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
		<h1>{{ game.player.name }}</h1>
		<div v-if="game.player.state !== 'READY'">

			<h2>You are...</h2>
			<h2 class="role">{{ game.player.character.title }}</h2>
			<div class="icon">
				<img :src="icon" />
			</div>
			<div class="team">Team: {{ game.player.character.team }}</div>
			<ul class="description">
				<li v-for="desc in description">{{ desc }}</li>
			</ul>

			<div v-if="game.player.character.type === 'wolf'">
				<p v-if="game.player.data.wolves.length === 1">You are the only wolf</p>
				<div v-if="game.player.data.wolves.length > 1">
					<p>The wolf pack:</p>
					<PlayerAvatar
						v-for="player in game.player.data.wolves"
						:key="player.id"
						:player="player"
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
	.role {
		font-family: 'Permanent Marker', cursive;
	}
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
		margin: 0px auto -12px;
		overflow: hidden;
		background: #FFFFFF;
		img {
			width: 85px;
    		margin: 8px 10px 0px 10px;
		}
	}
	.team {
		background: #000000;
		color: #FFFFFF;
		display: inline-block;
		padding: 5px 10px 2px;
	}
</style>
