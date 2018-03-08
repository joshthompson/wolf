<script>
	export default {
		name: 'Sky',
		props: ['time', 'refresh'],
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
				let waterReflectionContainerEl = component.getElementsByClassName('waterReflectionContainer')[0]
				let waterReflectionMiddleEl = component.getElementsByClassName('waterReflectionMiddle')[0]
				let waterEl = component.getElementsByClassName('water')[0]
				let darknessOverlayEl = component.getElementsByClassName('darknessOverlay')[0]
				let darknessOverlaySkyEl = component.getElementsByClassName('darknessOverlaySky')[0]
				let moonEl = component.getElementsByClassName('moon')[0]
				let horizonNightEl = component.getElementsByClassName('horizonNight')[0]
				let waterDistanceEl = component.getElementsByClassName('waterDistance')[0]
				let skyEl = component.getElementsByClassName('sky')[0]
				let horizonEl = component.getElementsByClassName('horizon')[0]

				let sunRadialGradient = `${this.sun.x}px ${this.sun.y}px, circle, rgba(242,248,247,1) 0%,rgba(249,249,28,1) 3%,rgba(247,214,46,1) 8%, rgba(248,200,95,1) 12%,rgba(201,165,132,1) 30%,rgba(115,130,133,1) 51%,rgba(46,97,122,1) 85%,rgba(24,75,106,1) 100%`
				sunEl.style.background = `-webkit-radial-gradient(${sunRadialGradient})`
				sunEl.style.background = `-moz-radial-gradient(${sunRadialGradient})`
				sunEl.style.background = `-ms-radial-gradient(${sunRadialGradient})`
				sunEl.style.background = `radial-gradient(${sunRadialGradient})`

				let sunDayRadialGradient = `${this.sun.x}px ${this.sun.y}px, circle, rgba(252,255,251,0.9) 0%,rgba(253,250,219,0.4) 30%,rgba(226,219,197,0.01) 70%, rgba(226,219,197,0.0) 70%,rgba(201,165,132,0) 100%`
				sunDayEl.style.background = `-webkit-radial-gradient(${sunDayRadialGradient})`
				sunDayEl.style.background = `-moz-radial-gradient(${sunDayRadialGradient})`
				sunDayEl.style.background = `-ms-radial-gradient(${sunDayRadialGradient})`
				sunDayEl.style.background = `radial-gradient(${sunDayRadialGradient})`

				let sunSetRadialGradient = `${this.sun.x}px ${this.sun.y}px, circle, rgba(254,255,255,0.8) 5%,rgba(236,255,0,1) 10%,rgba(253,50,41,1) 25%, rgba(243,0,0,1) 40%,rgba(93,0,0,1) 100%`
				sunSetEl.style.background = `-webkit-radial-gradient(${sunSetRadialGradient})`
				sunSetEl.style.background = `-moz-radial-gradient(${sunSetRadialGradient})`
				sunSetEl.style.background = `-ms-radial-gradient(${sunSetRadialGradient})`
				sunSetEl.style.background = `radial-gradient(${sunSetRadialGradient})`

				waterReflectionContainerEl.style.perspectiveOrigin = (this.sun.x / this.width * 100).toString() + '% -15%'
				waterReflectionMiddleEl.style.left = (this.sun.x - this.width - (this.width * .03)).toString() + 'px'

				sunEl.style.width = component.clientWidth
				sunEl.style.left = '0px'
				sunDayEl.style.width = component.clientWidth
				sunDayEl.style.left = '0px'

				darknessOverlayEl.style.opacity = Math.min((this.sun.y - (this.height / 2)) / (this.height / 2), 1)
				darknessOverlaySkyEl.style.opacity = Math.min((this.sun.y - (this.height * 7 / 10)) / (this.height - (this.height * 7 / 10)), 1)

				moonEl.style.opacity = Math.min((this.sun.y - (this.height * 9 / 10)) / (this.height - (this.height * 9 / 10)), 1)
				moonEl.style.left = `${this.moon.x}px`
				moonEl.style.top = `${this.moon.y}px`

				horizonNightEl.style.opacity = (this.sun.y - (this.height * 4 / 5)) / (this.height - (this.height * 4 / 5))

				waterDistanceEl.style.opacity = (this.sun.y / this.height + 0.6)
				sunDayEl.style.opacity = (1 - this.sun.y / this.height)
				skyEl.style.opacity = Math.min((1 - this.sun.y / this.height), 0.99)

				sunSetEl.style.opacity = (this.sun.y / this.height - 0.2)

				if (this.sun.y > 0) {
					if (this.sun.y > this.height / 2) {
						sunEl.style.opacity = Math.min((this.height - this.sun.y) / (this.height / 2) + 0.2, 0.5)
						horizonEl.style.opacity = (this.height - this.sun.y) / (this.height / 2) + 0.2
						waterReflectionMiddleEl.style.opacity = (this.height - this.sun.y) / (this.height / 2) - 0.1
					} else {
						horizonEl.style.opacity = Math.min(this.sun.y / (this.height / 2), 0.99)
						sunEl.style.opacity = Math.min(this.sun.y / (this.height / 2), 0.5)
						waterReflectionMiddleEl.style.opacity = this.sun.y / (this.height / 2) - 0.1
					}

				}

				setTimeout(this.sunMove, this.refresh)
			}
		}
	}
</script>
<template>
	<div id="skybox" style="width: 100%; height: 100%; margin: 0; padding: 0">
		<div class="sun"></div>
		<div class="sunDay"></div>
		<div class="sunSet"></div>
		<div class="sky"></div>
		<div class="horizon"></div>
		<div class="horizonNight"></div>
		<div class="moonContainer">
			<div class="moon"></div>
		</div>
		<div class="mountainRange">
			<div class="mountain"></div>
		</div>
		<div class="water"></div>
		<div class="waterReflectionContainer">
			<div class="waterReflectionMiddle"></div>
		</div>
		<div class="waterDistance"></div>
		<div class="darknessOverlaySky"></div>
		<div class="darknessOverlay"></div>
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

	.water,
	.waterDistance,
	.darknessOverlay,
	.waterReflectionContainer {
		display: none;
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

	.waterReflectionContainer {
		top: 100% !important;
		height: 70vh !important;
	}

	// Original CSS (more or less)
	.sun, .sunDay, .sunSet {
		position: absolute;
		top: 0px;
		left: 0%;
		width: 100%;
		height: 50%;
		background-repeat: no-repeat;
		@include radialGradient(bottom, circle, rgba(242,248,247,1) 0%,rgba(249,249,28,1) 3%,rgba(247,214,46,1) 8%, rgba(248,200,95,1) 12%,rgba(201,165,132,1) 30%,rgba(115,130,133,1) 51%,rgba(46,97,122,1) 85%,rgba(24,75,106,1) 100%);
		z-index: 10;
		opacity: 0.5;
		&.sunDay {
			@include radialGradient(bottom, circle, rgba(252,255,251,0.9) 0%,rgba(253,250,219,0.4) 30%,rgba(226,219,197,0.01) 70%, rgba(226,219,197,0.0) 70%,rgba(201,165,132,0) 100%);
			z-index: 999;
			opacity: 0.5;
		}
		&.sunSet {
			@include radialGradient(bottom, circle, rgba(254,255,255,0.8) 5%,rgba(236,255,0,1) 10%,rgba(253,50,41,1) 25%, rgba(243,0,0,1) 40%,rgba(93,0,0,1) 100%);
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
	.mountainRange {
		position: absolute;
		left: 0px;
		width: 100%;
		bottom: 50%;
		display:none;
		z-index: 999;
	}
	.mountain {
		border-bottom: 100px solid #000;
		border-right: 100px solid transparent;
		border-width-right: 50%;
		width: 0px;
		height: 0px;
		position: absolute;
		left: 0px;
		bottom: 50%;
		z-index: 999;
	}
	.horizon, .horizonNight {
		position: absolute;
		top: 0px;
		left: 0;
		width: 100%;
		height: 50%;
		background-repeat: no-repeat;
		z-index: 5;
		@include linearGradient(bottom, rgba(212,87,43,0.9) 0%, rgba(246,149,52,0.8) 20%,rgba(24,75,106,0) 100%);
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
	.darknessOverlay {
		background-color: #000;
		opacity: 0;
		position: absolute;
		bottom: 0px;
		left: 0px;
		width: 100%;
		height: 50%;
		z-index: 99;
	}
	.waterDistance {
		position: absolute;
		bottom: 0px;
		left: 0px;
		width: 100%;
		height: 50%;
		background-repeat: no-repeat;
		@include linearGradient(90deg, rgba(0,0,0,0.0) 10%,rgba(0,0,0,0.20) 44%,rgba(0,0,0,0.65) 95%,rgba(0,0,0,0.62) 100%);
	}
	.water {
		overflow: hidden;
		position: absolute;
		bottom: 0px;
		left: 0px;
		width: 100%;
		height: 50%;
		background-repeat: no-repeat;
		@include linearGradient(bottom, rgba(0,25,45,1) 0%,rgba(14,71,117,1) 35%, rgba(26,126,174,1) 70%, rgba(62,168,220,1) 100%);
		z-index: 10;
	}
	.waterReflectionContainer {
		perspective: 30;
		perspective-origin: 50% -12%;
		overflow: hidden;
		position: absolute;
		top: 50%;
		left: -3%;
		width: 103%;
		height: 50%;
		z-index: 25;
	}
	.waterReflectionMiddle {
		position: absolute;
		top: 0px;
		left: -50%;
		width: 200%;
		height: 55%;
		background-repeat: no-repeat;
		@include radialGradient(50% 0px, rgba(247,177,72,1) 3%,rgba(248,175,65,1) 6%,rgba(207,62,30,0.4) 35%,rgba(176,91,48,0.1) 45%,rgba(141,88,47,0.0) 60%,rgba(116,82,63,0.0) 70%,rgba(44,65,68,0.0) 80%,rgba(7,19,31,0.0) 100%);
		z-index: 999;
		opacity: 0.7;
		transform: rotateX(45deg);
	}
	.waterReflectionMiddleThin {
		position: absolute;
		bottom: 0px;
		left: 0px;
		width: 100%;
		height: 100%;
		background-repeat: no-repeat;
		background: linear-gradient(left, rgba(69,70,61,0.0) 3%,rgba(216,100,38,0.10) 32%,rgba(252,176,48,0.35) 35%,rgba(253,215,79,1) 45%,rgba(253,254,225,1) 48%,rgba(253,254,225,1) 52%, rgba(024,194,214,1) 55%, rgba(034,204,234,0.10) 65%, rgba(034,204,234,0.10) 60%, rgba(034,204,234,0.0) 97%);
		z-index: 999;
		transform: rotateX(45deg);
	}
	.division {
		height: 5px;
		width: 100%;
		position: absolute;
		top: 50%;
		bottom: 50%;
		background-color: rgba(000,14,24,0.0);
		z-index: 9999;
		cursor: ns-resize;
	}
	.coor {
		position: absolute;
		left: 0px;
		top: 0px;
		z-index: 999;
		color: #fff;
	}
</style>