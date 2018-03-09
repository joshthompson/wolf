<script>
	import Sky from './Sky.vue';
	export default {
		name: 'Village',
		props: ['time', 'refresh'],
		components: { Sky },
		methods: {
			addZero(n) {
				return n < 10 ? '0' + n : n
			}
		},
		computed: {
			phase() {
				if (this.time < 6 || this.time > 17) {
					return 'night'
				} else {
					return 'day'
				}
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
			<div class="sky-layer">
				<Sky :time="time" :refresh="refresh"></Sky>
			</div>
			<div class="slot">
				<slot name="sky"></slot>
			</div>
		</div>
		<div class="ground"></div>
		<div class="content">
			<div class="forest">
				<img src="/imgs/tree1.png" class="village-object tree" />
				<img src="/imgs/tree2.png" class="village-object tree" />
				<img src="/imgs/tree2.png" class="village-object tree" />
				<img src="/imgs/tree1.png" class="village-object tree" />
				<img src="/imgs/tree3.png" class="village-object tree" />
				<img src="/imgs/tree2.png" class="village-object tree" />
				<img src="/imgs/tree3.png" class="village-object tree" />
				<img src="/imgs/tree3.png" class="village-object tree" />
				<img src="/imgs/tree2.png" class="village-object tree" />
				<img src="/imgs/tree3.png" class="village-object tree" />
			</div>
			<slot></slot>
		</div>	
	</div>
</template>

<style lang="scss">
	@import '../../../style/mixins.scss';
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
		transition: background $transition linear;
		position: relative;
		z-index: 2;
		height: 30vh;
		.sky-layer {
			height: 30vh;
			margin-bottom: -30vh;
		}
		.slot {
			position: relative;
		}
	}

	.ground {
		height: 70vh;
		margin-bottom: -70vh;
		position: relative;
		z-index: 1;
		transition: background $transition linear;
		[phase="day"] &,
		[phase="sunset"] &  {
			background: #66CC66;
		}
		[phase="night"] &,
		[phase="dawn"] & {
			background: #002500;
		}
	}

	.content {
		z-index: 3;
		position: relative;
		height: 70vh;
		.forest {
			margin-top: -50px;
			height: 100px;
			overflow: hidden;
			.tree {
				height: 100px;
			}
		}
	}

	.village-object {
		transition: $transition;
		[phase="day"] &,
		[phase="sunset"] &  {
			filter: saturate(100%) brightness(100%);
			&.tree {
				filter: saturate(200%) brightness(100%);
			}
		}
		[phase="night"] &,
		[phase="dawn"] & {
			filter: saturate(25%) brightness(50%);
			&.tree {
				filter: saturate(50%) brightness(50%);
			}
		}
	}

</style>
