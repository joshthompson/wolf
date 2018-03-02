<script>
	import AnimatedSprite from './AnimatedSprite.vue'
	export default {
		name: 'ShopKeeper',
		components: { AnimatedSprite },
		data() {
			return {
				data: {
					img: '/imgs/avatars/shopkeeper.png',
					width: 80,
					height: 80,
					fps: 20,
					frames: [
						['stand', 'walk1', 'walk2', 'walk3', 'walk4', 'walk5', 'walk6', 'walk7', 'walk8'],
						['fall1', 'fall2', 'fall3', 'fall4', 'fall5', 'throw1', 'throw2', 'throw3', 'throw4', 'throw5']
					],
					cycles: {
						walk: ['walk1', 'walk2', 'walk3', 'walk4', 'walk5', 'walk6', 'walk7', 'walk8'],
						fall: ['fall1', 'fall2', 'fall3', 'fall4', 'fall5'],
						throw: ['throw1', 'throw2', 'throw3', 'throw4', 'throw5']
					}
				}
			}
		}
	}
</script>
<template>
	<AnimatedSprite :data="data"></AnimatedSprite>
</template>
