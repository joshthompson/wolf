<script>
	export default {
		name: 'TitleCard',
		props: {
			text: String,
			seconds: {
				default: 3,
				type: Number
			}
		},
		data() {
			return {
				fadeOut: false,
				remove: false
			}
		},
		created() {
			setTimeout(() => this.fadeOut = true, this.seconds * 1000)
			setTimeout(() => this.remove = true, (this.seconds + 1) * 1000)
		}
	}
</script>

<template>
	<div class="title-card" :class="{fadeOut: fadeOut, remove: remove}">
		<h1>{{ text }}</h1>
	</div>
</template>

<style lang="scss" scoped>
	.title-card {
		position: fixed;
		top: 0px;
		left: 0px;
		width: 100vw;
		height: 100vh;
		z-index: 20000;
		font-size: 32px;
		padding: 50vh 10px 10px;
		background: #000000;
		color: #FFFFFF;
		opacity: 1;
		transition: opacity 1s linear;
		h1 {
			text-transform: none;
			transform: translate(0px, -50%);
			margin: 0px; 
		}
		&.fadeOut {
			opacity: 0;
		}
		&.remove {
			display: none;
		}
		
		font-family: 'Permanent Marker', cursive;
		color: #EEC74A;
	}
</style>
