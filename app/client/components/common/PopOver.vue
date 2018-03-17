<script>
	export default {
		name: 'PopOver',
		props: ['show'],
		methods: {
			hide() {
				this.$emit('hide')
			}
		}
	}
</script>

<template>
	<div class="pop-over" @click="hide()" v-if="show">
		<div class="pop-over-inner">
			<slot />
		</div>
	</div>
</template>

<style lang="scss" scoped>
	.pop-over {
		position: fixed;
		width: 100vw;
		height: 100vh;
		background: rgba(0, 0, 0, 0.25);
		cursor: pointer;
		.pop-over-inner {
			position: fixed;
			top: 50%;
			left: 50%;
			padding: 20px 50px;
			transform: translate(-50%, -50%);
			max-width: calc(100vw - 20px);
			max-height: calc(100vh - 20px);
			z-index: 10000;
			background: white;
			box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
			overflow-y: auto;
			transition: padding 0.2s linear;

			h2 {
				margin: 0px 0px 20px;
			}
			
			p {
				margin: 20px 0px 0px;
			}

			@media screen and (max-height: 300px) {
				padding-top: 0px;
				padding-bottom: 0px;
			}

			@media screen and (max-width: 600px) {
				padding-left: 20px;
				padding-right: 20px;
			}
		}
	}
</style>