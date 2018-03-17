<script>
	export default {
		name: 'Sky',
		computed: {
			width() {
				return window.innerWidth
			},
			height() {
				return document.getElementById('skybox').clientHeight * 1.5
			},
			sun() {
				let timeOffset = (this.time + 6) % 24
				let percentage = timeOffset / 24
				return {
					x: this.center().x + this.height * Math.cos(2 * Math.PI * percentage),
					y: this.center().y + this.height * Math.sin(2 * Math.PI * percentage)
				}
			},
			moon() {
				let timeOffset = (this.time - 6) % 24
				let percentage = timeOffset / 24
				return {
					x: this.center().x + this.height * Math.cos(2 * Math.PI * percentage),
					y: this.center().y + this.height * Math.sin(2 * Math.PI * percentage)
				}
			},
			time() {
				return this.$root.game.time
			},
			refresh() {
				return this.$root.game.refresh
			}
		},
		created() {
			setTimeout(this.sunMove, 1)
		},
		methods: {
			center() {
				return {
					x: window.innerWidth / 2,
					y: this.height
				}
			},
			sunMove() {

				let component = document.getElementById('skybox')
				let sunEl = component.getElementsByClassName('sun')[0]
				let sunDayEl = component.getElementsByClassName('sunDay')[0]
				let sunSetEl = component.getElementsByClassName('sunSet')[0]
				let darknessOverlaySkyEl = component.getElementsByClassName('darknessOverlaySky')[0]
				let moonEl = component.getElementsByClassName('moon')[0]
				let horizonNightEl = component.getElementsByClassName('horizonNight')[0]
				let skyEl = component.getElementsByClassName('sky')[0]
				let horizonEl = component.getElementsByClassName('horizon')[0]

				let sunRadialGradient = `${this.sun.x}px ${this.sun.y}px, circle, rgba(242,248,247,1) 0%, rgba(249,249,28,1) 3%, rgba(247,214,46,1) 8%, rgba(248,200,95,1) 12%, rgba(201,165,132,1) 30%, rgba(115,130,133,1) 51%, rgba(46,97,122,1) 85%, rgba(24,75,106,1) 100%`
				sunEl.style.background = `-webkit-radial-gradient(${sunRadialGradient})`
				sunEl.style.background = `-moz-radial-gradient(${sunRadialGradient})`
				sunEl.style.background = `-ms-radial-gradient(${sunRadialGradient})`
				sunEl.style.background = `radial-gradient(${sunRadialGradient})`

				let sunDayRadialGradient = `${this.sun.x}px ${this.sun.y}px, circle, rgba(252,255,251,0.9) 0%, rgba(253,250,219,0.4) 30%, rgba(226,219,197,0.01) 70%, rgba(226,219,197,0.0) 70%, rgba(201,165,132,0) 100%`
				sunDayEl.style.background = `-webkit-radial-gradient(${sunDayRadialGradient})`
				sunDayEl.style.background = `-moz-radial-gradient(${sunDayRadialGradient})`
				sunDayEl.style.background = `-ms-radial-gradient(${sunDayRadialGradient})`
				sunDayEl.style.background = `radial-gradient(${sunDayRadialGradient})`

				let sunSetRadialGradient = `${this.sun.x}px ${this.sun.y}px, circle, rgba(254,255,255,0.8) 5%, rgba(236,255,0,1) 10%, rgba(253,50,41,1) 25%, rgba(243,0,0,1) 40%, rgba(93,0,0,1) 100%`
				sunSetEl.style.background = `-webkit-radial-gradient(${sunSetRadialGradient})`
				sunSetEl.style.background = `-moz-radial-gradient(${sunSetRadialGradient})`
				sunSetEl.style.background = `-ms-radial-gradient(${sunSetRadialGradient})`
				sunSetEl.style.background = `radial-gradient(${sunSetRadialGradient})`

				sunEl.style.width = component.clientWidth
				sunEl.style.left = '0px'
				sunDayEl.style.width = component.clientWidth
				sunDayEl.style.left = '0px'

				darknessOverlaySkyEl.style.opacity = Math.min((this.sun.y - (this.height * 7 / 10)) / (this.height - (this.height * 7 / 10)), 1)

				moonEl.style.opacity = Math.min((this.sun.y - (this.height * 9 / 10)) / (this.height - (this.height * 9 / 10)), 1)
				moonEl.style.left = `${this.moon.x}px`
				moonEl.style.top = `${this.moon.y}px`

				horizonNightEl.style.opacity = (this.sun.y - (this.height * 4 / 5)) / (this.height - (this.height * 4 / 5))

				sunDayEl.style.opacity = (1 - this.sun.y / this.height)
				skyEl.style.opacity = Math.min((1 - this.sun.y / this.height), 0.99)

				sunSetEl.style.opacity = (this.sun.y / this.height - 0.2)

				if (this.sun.y > 0) {
					if (this.sun.y > this.height / 2) {
						sunEl.style.opacity = Math.min((this.height - this.sun.y) / (this.height / 2) + 0.2, 0.5)
						horizonEl.style.opacity = (this.height - this.sun.y) / (this.height / 2) + 0.2
					} else {
						horizonEl.style.opacity = Math.min(this.sun.y / (this.height / 2), 0.99)
						sunEl.style.opacity = Math.min(this.sun.y / (this.height / 2), 0.5)
					}

				}

				setTimeout(this.sunMove, this.refresh)
			}
		}
	}
</script>
<template>
	<div id="skybox">
		<div class="sun"></div>
		<div class="sunDay"></div>
		<div class="sunSet"></div>
		<div class="sky"></div>
		<div class="horizon"></div>
		<div class="horizonNight"></div>
		<div class="moonContainer">
			<div class="moon"></div>
		</div>
		<div class="darknessOverlaySky"></div>
	</div>
</template>

<style lang="scss" scoped>
	@import '../../../style/mixins.scss';

	$height: 30vh;

	#skybox {
		overflow: hidden;
		background-color: black;
		height: $height;
	}

	.sky,
	.horizon,
	.horizonNight,
	.sunSet,
	.sunDay,
	.darknessOverlaySky,
	.sun {
		height: 100% !important;
	}
	// Original CSS (more or less)
	.sun, .sunDay, .sunSet {
		position: absolute;
		top: 0px;
		left: 0%;
		width: 100%;
		height: 50%;
		background-repeat: no-repeat;
		@include radialGradient(bottom, circle, rgba(242,248,247,1) 0%, rgba(249,249,28,1) 3%, rgba(247,214,46,1) 8%, rgba(248,200,95,1) 12%, rgba(201,165,132,1) 30%, rgba(115,130,133,1) 51%, rgba(46,97,122,1) 85%, rgba(24,75,106,1) 100%);
		z-index: 10;
		opacity: 0.5;
		&.sunDay {
			@include radialGradient(bottom, circle, rgba(252,255,251,0.9) 0%, rgba(253,250,219,0.4) 30%, rgba(226,219,197,0.01) 70%, rgba(226,219,197,0.0) 70%, rgba(201,165,132,0) 100%);
			z-index: 999;
			opacity: 0.5;
		}
		&.sunSet {
			@include radialGradient(bottom, circle, rgba(254,255,255,0.8) 5%, rgba(236,255,0,1) 10%, rgba(253,50,41,1) 25%, rgba(243,0,0,1) 40%, rgba(93,0,0,1) 100%);
			z-index: 999;
			opacity: 0.3;
		}
	}

	.moonContainer {
		height: $height;
		overflow: hidden;
	}

	.moon {
		position: relative;
		// top: 5vh;
		// left: 35%;
		width: 200px;
		height: 200px;
		background-size: 200px 200px;
		background-image: url('/imgs/moon.png');
		border-radius: 50%;
		box-shadow: 0px 0px 150px rgba(255, 255, 255, 0.5);
		z-index: 10001;
		opacity: 0;
		@media screen and (max-height: 1000px) {
			width: 100px;
			height: 100px;
			background-size: 100px 100px;
		}
		@media screen and (max-height: 600px) {
			width: 50px;
			height: 50px;
			background-size: 50px 50px;
		}
	}
	
	.sky {
		position: absolute;
		top: 0px;
		left: 0px;
		width: 100%;
		height: 50%;
		z-index: 5;
		@include linearGradient(bottom, rgba(249,251,240,1) 10%, rgba(215,253,254,1) 20%, rgba(167,222,253,1) 40%, rgba(110,175,255,1) 100%);
		opacity: 0.52;
	}
	.horizon, .horizonNight {
		position: absolute;
		top: 0px;
		left: 0;
		width: 100%;
		height: 50%;
		background-repeat: no-repeat;
		z-index: 5;
		@include linearGradient(bottom, rgba(212,87,43,0.9) 0%, rgba(246,149,52,0.8) 20%, rgba(24,75,106,0) 100%);
		opacity: 0.99;
		&.horizonNight {
			z-index: 10000;
			@include linearGradient(bottom, rgba(36, 54, 93, 1) 0%, rgba(0,11,22,0.1) 60%);
			opacity: 0;
		}
	}

	.darknessOverlaySky {
		background-color: #000;
		opacity: 0;
		position: absolute;
		top: 0px;
		left: 0px;
		width: 100%;
		height: 50%;
		z-index: 9999;
	}
</style>