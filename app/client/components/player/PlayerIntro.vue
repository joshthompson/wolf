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
		<h2>{{ game.player.character.title }}</h2>
		<h3>Team: {{ game.player.character.team }}</h3>
		<img :src="icon" class="icon" />
		<ul class="description">
			<li v-for="desc in description">{{ desc }}</li>
		</ul>
		<button @click="gotIt()" class="btn blue">Got it!</button>
	</div>
</template>

<style lang="scss" scoped>
	.description {
		text-align: left;
	}
	.icon {
		width: 75px;
	}
</style>
