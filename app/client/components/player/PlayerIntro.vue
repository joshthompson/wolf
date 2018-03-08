<script>
	export default {
		name: 'PlayerIntro',
		props: ['game'],
		methods: {
			gotIt() {
				this.game.client.setState('READY')
			}
		},
		computed: {
			description() {
				return this.game.player.character.description
			},
			icon() {
				return this.game.player.character.icon || `/imgs/avatars/${this.game.player.avatar}.png`
			}
		}
	}
</script>

<template>
	<div id="PlayerIntro" class="view">
		<h1>{{ game.player.name }}</h1>

		<h2>You are...</h2>
		<h2 class="role">{{ game.player.character.title }}</h2>

		<div class="icon">
			<img :src="icon" />
		</div>
		<div class="team">Team: {{ game.player.character.team }}</div>

		<ul class="description">
			<li v-for="desc in description">{{ desc }}</li>
		</ul>
		<button @click="gotIt()" class="btn blue">Got it!</button>
	</div>
</template>

<style lang="scss" scoped>
	.role {
		font-family: 'Permanent Marker', cursive;
	}
	.description {
		text-align: left;
	}
	.icon {
		border: 2px solid black;
		width: 100px;
		height: 100px;
		border-radius: 50%;
		margin: 0px auto -12px;
		overflow: hidden;
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
