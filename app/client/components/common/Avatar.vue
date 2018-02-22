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
		<img class="head" src="/imgs/wolf.png" v-bind:class="{ right: headPos === 'right', left: headPos === 'left' }"/>
		<img class="body" src="/imgs/body.png" />
		<h2>{{ player.name }}</h2>
	</div>
</template>
