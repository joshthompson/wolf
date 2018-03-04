<script>
	import Avatar from '../common/Avatar.vue';
	import Countdown from '../common/Countdown.vue';
	export default {
		name: 'Village',
		data() {
			return {
				time: 9 // 0 - 24 hours of day
			}
		},
		created() {
			setTimeout(this.timer, 10);
		},
		methods: {
			timer() {
				this.time = (this.time + 0.005) % 24
				setTimeout(this.timer, 10);
			}
		},
		computed: {
			phase() {
				if (this.time < 7 || this.time > 19) {
					return 'night'
				} else {
					return 'day'
				}
			},
			moon() {
				return 360 * (this.time / 24);
			},
			sun() {
				return 360 * (this.time / 24) - 180;
			}
		}
	}
</script>

<template>
	<div id="village" :phase="phase">
		<div class="sky">
			<div class="moon-sun">
				<img src="/imgs/moon.png" class="moon" :style="{transform: `rotate(${moon}deg)`}" />
				<img src="/imgs/sun.png" class="sun" :style="{transform: `rotate(${sun}deg)`}" />
			</div>
			<div class="slot">
				<slot name="sky"></slot>
			</div>
		</div>
		<div class="ground">
			<div class="forest">
				<img src="/imgs/tree1.png" class="object tree" />
				<img src="/imgs/tree2.png" class="object tree" />
				<img src="/imgs/tree2.png" class="object tree" />
				<img src="/imgs/tree1.png" class="object tree" />
				<img src="/imgs/tree3.png" class="object tree" />
				<img src="/imgs/tree2.png" class="object tree" />
				<img src="/imgs/tree3.png" class="object tree" />
			</div>
			<slot></slot>
		</div>		
	</div>
</template>

<style lang="scss" scoped>
	@import '../../style/mixins.scss';
	$transition:
		filter 5s linear,
		background 5s linear,
		color 5s linear;

	#village {
		transition: $transition;
		display: flex;
		flex-direction: column;
		height: 100vh;
		overflow: hidden;

		&[phase="night"] {
			color: #FFFFFF;
		}
		&[phase="day"] {
			color: #000000;
		}
	}

	.sky {
		transition: $transition;
		position: relative;
		z-index: 1;
		height: 200px;
		[phase="night"] & {
			@include gradient(#000000, #2E2E44);
		}
		[phase="day"] & {
			@include gradient(#3EACCC, #A9FCFF);
		}
		.moon-sun {
			height: 200px;
			margin-bottom: -200px;
			position: relative;
			z-index: 3;
		}
		.slot {
			position: relative;
			z-index: 4;
		}
		.moon, .sun {
			width: 100px;
			height: 100px;
			border-radius: 50px;
			margin: 0px -100px 0px -50px;
			animation: rotate 1s infinite;
			transform-origin: 50px 400px;
		}
		.sun {
			box-shadow: 0px 0px 40px rgba(255, 255, 255, 0.8);
		}
	}

	.ground {
		transition: $transition;
		z-index: 2;
		position: relative;
		flex-grow: 1;
		[phase="night"] & {
			background: #002500;
		}
		[phase="day"] & {
			background: #66CC66;
		}

		.forest {
			margin-top: -50px;
			.tree {
				height: 100px;
			}
		}
	}

	.object {
		transition: $transition;
		[phase="night"] & {
			filter: saturate(50%) brightness(50%);
		}
		[phase="day"] & {
			filter: saturate(200%) brightness(100%);
		}
	}

</style>
