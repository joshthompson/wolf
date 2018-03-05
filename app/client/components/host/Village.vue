<script>
	import Avatar from '../common/Avatar.vue';
	import Countdown from '../common/Countdown.vue';
	export default {
		name: 'Village',
		data() {
			return {
				time: 16 // 0 - 24 hours of day
			}
		},
		created() {
			setTimeout(this.timer, 10);
		},
		methods: {
			timer() {
				this.time = (this.time + 0.005) % 24
				setTimeout(this.timer, 10);
			},
			addZero(n) {
				return n < 10 ? '0' + n : n
			}
		},
		computed: {
			phase() {
				if (this.time < 6 || this.time > 20) {
					return 'night'
				} else if (this.time > 18) {
					return 'sunset'
				} else if (this.time < 7) {
					return 'dawn'
				} else {
					return 'day'
				}
			},
			percentage() {
				return ((this.time + 21) % 24)
			},
			moon() {
				return 360 * this.percentage / 24
			},
			sun() {
				return 360 * this.percentage / 24 - 180
			},
			timeStr() {
				return this.addZero(Math.floor(this.time)) + ":" + this.addZero(Math.floor((this.time % 1) * 60))
			}
		}
	}
</script>

<template>
	<div id="village" :phase="phase">
		<pre style="position: fixed; bottom: 0px; right: 20px; z-index: 1000;">{{timeStr}}</pre>
		<div class="sky">
			<div class="sky-layer day"></div>
			<div class="sky-layer night"></div>
			<div class="sky-layer dawn"></div>
			<div class="sky-layer sunset"></div>
			<div class="moon-sun">
				<div class="moon" :style="{transform: `rotate(${moon}deg)`}">
					<div :style="{transform: `rotate(${-moon}deg)`}"></div>
				</div>
				<div class="sun" :style="{transform: `rotate(${sun}deg)`}"></div>
			</div>
			<div class="slot">
				<slot name="sky"></slot>
			</div>
		</div>
		<div class="ground">
			<div class="forest">
				<img src="/imgs/tree1.png" class="village-object tree" />
				<img src="/imgs/tree2.png" class="village-object tree" />
				<img src="/imgs/tree2.png" class="village-object tree" />
				<img src="/imgs/tree1.png" class="village-object tree" />
				<img src="/imgs/tree3.png" class="village-object tree" />
				<img src="/imgs/tree2.png" class="village-object tree" />
				<img src="/imgs/tree3.png" class="village-object tree" />
			</div>
			<slot></slot>
		</div>		
	</div>
</template>

<style lang="scss">
	@import '../../style/mixins.scss';
	$transition: 5s;

	#village {
		transition: color $transition linear;
		display: flex;
		flex-direction: column;
		height: 100vh;
		overflow: hidden;

		&[phase="day"],
		&[phase="sunset"] {
			color: #000000;
		}
		&[phase="night"],
		&[phase="dawn"] {
			color: #FFFFFF;
		}
	}

	.sky {

		// Todo: use this guys sunrise/sunset css
		// https://codepen.io/msaetre/pen/nlsJL
		transition: background $transition linear;
		position: relative;
		z-index: 1;
		height: 30vh;

		.sky-layer {
			height: 30vh;
			margin-bottom: -30vh;
			opacity: 0;
			transition: opacity $transition linear;

			&.day {
				@include gradient(#3EACCC, #A9FCFF);
				[phase="day"] & { opacity: 1; }
			}
			&.sunset {
				@include gradient(#FEC64B, #FEC64B);
				[phase="sunset"] & { opacity: 1; }
			}
			&.night {
				@include gradient(#000000, #2E2E44);
				[phase="night"] & { opacity: 1; }
			}
			&.dawn {
				@include dawn();
				[phase="dawn"] & { opacity: 1; }
			}
		}

		[phase="day"] & {
			background: #3EACCC;
		}
		[phase="sunset"] & {
			background: #FEC64B;
		}
		[phase="night"] &,
		[phase="dawn"] & {
			background: #2E2E44;
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
			display: inline-block;
			width: 100px;
			height: 100px;
			border-radius: 50px;
			margin: 0px -100px 0px -50px;
			animation: rotate 1s infinite;
			transform-origin: 50px calc(30vh + 100px);
		}
		.moon > div {
			display: inline-block;
			width: 100px;
			height: 100px;
			border-radius: 50px;
			background: url("/imgs/moon.png");
			background-size: 100px 100px;
			box-shadow: 0px 0px 100px rgba(255, 255, 255, 0.5);
		}
		.sun {
			transition: background $transition linear,
						box-shadow $transition linear;
			background: #FFFECE;
			box-shadow: 0px 0px 40px rgba(255, 255, 255, 0.8);
			[phase="sunset"] & {
				box-shadow: 0px 0px 30px rgba(255, 255, 30, 0.8);
			}
		}
	}

	.ground {
		transition: background $transition linear;
		z-index: 2;
		position: relative;
		flex-grow: 1;
		[phase="day"] &,
		[phase="sunset"] &  {
			background: #66CC66;
		}

		.forest {
			margin-top: -50px;
			.tree {
				height: 100px;
			}
		}
		[phase="night"] &,
		[phase="dawn"] & {
			background: #002500;
		}
	}

	.village-object {
		transition: $transition;
		[phase="day"] &,
		[phase="sunset"] &  {
			filter: saturate(200%) brightness(100%);
		}
		[phase="night"] &,
		[phase="dawn"] & {
			filter: saturate(50%) brightness(50%);
		}
	}

</style>
