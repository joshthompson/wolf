<script>
	import AnimatedSprite from './AnimatedSprite.vue'
	export default {
		name: 'Spelunker',
		components: { AnimatedSprite },
		data() {
			return {
				data: {
					img: '/imgs/avatars/spelunker.png',
					width: 80,
					height: 80,
					fps: 12,
					frames: [
						['stand', 'walk1', 'walk2', 'walk3', 'walk4', 'walk5', 'walk6', 'walk7', 'walk8']
					],
					cycles: {
						walk: ['walk1', 'walk2', 'walk3', 'walk4', 'walk5', 'walk6', 'walk7', 'walk8']
					}
				}
			}
		}
	}
</script>
<template>
	<AnimatedSprite :data="data"></AnimatedSprite>
</template>
