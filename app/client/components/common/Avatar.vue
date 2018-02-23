<script>
	export default {
		name: 'avatar',
		props: ['player'],
		data() {
			return {
				headPos: 'center'
			}
		},
		created() {
			this.headMove()
		},
		methods: {
			headMove() {
				let num = Math.random()
				this.headPos = num > 2/3 ? 'left' : (num < 1/3 ? 'right' : 'center')
				setTimeout(() => this.headMove(), Math.random() * 4000 + 2000)
			}
		}
	}
</script>

<template>
	<div class="avatar">
		<!-- <img class="head" src="/imgs/wolf.png" v-bind:class="{ right: headPos === 'right', left: headPos === 'left' }"/>
		<img class="body" src="/imgs/body.png" /> -->
		<img :src="`/imgs/avatars/${player.avatar}.png`" />
		<h2>{{ player.name }}</h2>
	</div>
</template>

<style lang="scss" scoped>
	.avatar {
		display: inline-block;
		padding: 20px;
		.head {
			width: 100px;
			display: block;
			margin: 0px auto;
			position: relative;
			z-index: 2;
			transition: transform 0.5s linear;
			text-transform: uppercase;
		}
		&.left { transform: rotate(-5deg); }
		&.right { transform: rotate(5deg); }
		.body {
			width: 50px;
			display: block;
			margin: -30px auto 0px;
			position: relative;
			z-index: 1;
		}
	}
</style>