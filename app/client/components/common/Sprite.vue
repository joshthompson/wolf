<script>
	export default {
		name: 'Sprite',
		props: ['img', 'size', 'pos'],
		computed: {
			style() {
				return {
					display: 'inline-block',
					width: `${this.size[0]}px`,
					height: `${this.size[1]}px`,
					backgroundImage: `url(${this.img})`,
					// backgroundSize: `${this.size[0]}px ${this.size[1]}px`,
					backgroundPosition: `${this.pos[0]}px ${this.pos[1]}px`
				}
			}
		}
	}
</script>

<template>
	<div v-bind:style="[style]"></div>
</template>
