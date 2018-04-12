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
		data() {
			return {
				reverse: false
			}
		},
		computed: {
			classes() {
				let classes = {avatar: true}
				classes[this.mode] = true
				return classes
			}
		},
		created() {
			setTimeout(this.orientate, 0)
			window.addEventListener('resize', this.orientate)
		},
		methods: {
			orientate() {
				const iconCenter = this.$refs.icon ? this.$refs.icon.offsetLeft + this.$refs.icon.width / 2 : 0
				const pageCenter = window.innerWidth / 2 + 0.5 // +0.5 sorts middle person flickering
				this.reverse = iconCenter > pageCenter
			}
		}
	}
</script>

<template>
	<div :class="classes">
		<img
			v-if="player.avatar"
			ref="icon"
			:src="`/imgs/avatars/${player.avatar}.png`"
			:class="{reverse: reverse}"
		/>
		<Loader v-if="!player.avatar" class="loader" />
		<p class="name">{{ player.name }}</p>
	</div>
</template>

<style lang="scss" scoped>
	.avatar {
		display: inline-block;
		font-size: small;
		text-transform: uppercase;

		img {
			transform-origin: 50% 50%;
			&.reverse {
				transform: scaleX(-1);
			}
		}

		&.ghost img {
			filter: saturate(0%) brightness(150%);
			opacity: 0.8;
		}

		&.icon {
			.name {
				display: none;
			}
		}
	}
</style>
