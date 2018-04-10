<script>
	import Loader from './Loader.vue'
	export default {
		name: 'PlayerAvatar',
		props: {
			player: Object,
			mode: {
				default: 'all',
				type: String
			}
		},
		components: { Loader },
		computed: {
			classes() {
				let classes = {avatar: true}
				classes[this.mode] = true
				return classes
			}
		}
	}
</script>

<template>
	<div :class="classes">
		<img v-if="player.avatar" :src="`/imgs/avatars/${player.avatar}.png`" />
		<Loader v-if="!player.avatar" class="loader" />
		<p class="name">{{ player.name }}</p>
	</div>
</template>

<style lang="scss" scoped>
	.avatar {
		display: inline-block;
		padding: 20px;
		font-size: small;
		text-transform: uppercase;
		&.ghost img {
			filter: saturate(0%) brightness(150%);
			opacity: 0.8;
		}

		&.icon {
			padding: 0px;
			.name {
				display: none;
			}
		}
	}
</style>
