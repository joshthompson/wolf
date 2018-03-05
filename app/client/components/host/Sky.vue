<script>
	export default {
		name: 'Sky',
		props: ['time'],
		computed: {
			myWidth() {
				return window.innerWidth
			},
			myHeight() {
				return document.getElementById('skybox').clientHeight * 1.5
			},
			sun() {
				let length = this.myHeight
				let timeOffset = (this.time + 6) % 24
				let percentage = timeOffset / 24
				let center = {
					x: window.innerWidth / 2,
					y: length
				}
				return {
					x: center.x + length * Math.cos(2 * Math.PI * percentage),
					y: center.y + length * Math.sin(2 * Math.PI * percentage)
				}
			},
		},
		created() {
			setTimeout(this.sunMove, 1)
		},
		methods: {
			sunMove() {

				let component = document.getElementById('skybox')
				let sunEl = component.getElementsByClassName("sun")[0]
				let sunDayEl = component.getElementsByClassName("sunDay")[0]
				let sunSetEl = component.getElementsByClassName("sunSet")[0]
				let waterReflectionContainerEl = component.getElementsByClassName("waterReflectionContainer")[0]
				let waterReflectionMiddleEl = component.getElementsByClassName("waterReflectionMiddle")[0]
				let waterEl = component.getElementsByClassName("water")[0]
				let darknessOverlayEl = component.getElementsByClassName("darknessOverlay")[0]
				let darknessOverlaySkyEl = component.getElementsByClassName("darknessOverlaySky")[0]
				let moonEl = component.getElementsByClassName("moon")[0]
				let horizonNightEl = component.getElementsByClassName("horizonNight")[0]
				let starsContainerEl = component.getElementsByClassName("starsContainer")[0]
				let waterDistanceEl = component.getElementsByClassName("waterDistance")[0]
				let skyEl = component.getElementsByClassName("sky")[0]
				let cloudEl = component.getElementsByClassName("cloud")[0]
				let starEl = component.getElementsByClassName("star")[0]
				let horizonEl = component.getElementsByClassName("horizon")[0]

				sunEl.style.background = '-webkit-radial-gradient(' + this.sun.x + 'px ' + this.sun.y + 'px, circle, rgba(242,248,247,1) 0%,rgba(249,249,28,1) 3%,rgba(247,214,46,1) 8%, rgba(248,200,95,1) 12%,rgba(201,165,132,1) 30%,rgba(115,130,133,1) 51%,rgba(46,97,122,1) 85%,rgba(24,75,106,1) 100%)';
				sunEl.style.background = '-moz-radial-gradient(' + this.sun.x + 'px ' + this.sun.y + 'px, circle, rgba(242,248,247,1) 0%,rgba(249,249,28,1) 3%,rgba(247,214,46,1) 8%, rgba(248,200,95,1) 12%,rgba(201,165,132,1) 30%,rgba(115,130,133,1) 51%,rgba(46,97,122,1) 85%,rgba(24,75,106,1) 100%)';
				sunEl.style.background = '-ms-radial-gradient(' + this.sun.x + 'px ' + this.sun.y + 'px, circle, rgba(242,248,247,1) 0%,rgba(249,249,28,1) 3%,rgba(247,214,46,1) 8%, rgba(248,200,95,1) 12%,rgba(201,165,132,1) 30%,rgba(115,130,133,1) 51%,rgba(46,97,122,1) 85%,rgba(24,75,106,1) 100%)';

				sunDayEl.style.background = '-webkit-radial-gradient(' + this.sun.x + 'px ' + this.sun.y + 'px, circle, rgba(252,255,251,0.9) 0%,rgba(253,250,219,0.4) 30%,rgba(226,219,197,0.01) 70%, rgba(226,219,197,0.0) 70%,rgba(201,165,132,0) 100%)';
				sunDayEl.style.background = '-moz-radial-gradient(' + this.sun.x + 'px ' + this.sun.y + 'px, circle, rgba(252,255,251,0.9) 0%,rgba(253,250,219,0.4) 30%,rgba(226,219,197,0.01) 70%, rgba(226,219,197,0.0) 70%,rgba(201,165,132,0) 100%)';
				sunDayEl.style.background = '-ms-radial-gradient(' + this.sun.x + 'px ' + this.sun.y + 'px, circle, rgba(252,255,251,0.9) 0%,rgba(253,250,219,0.4) 30%,rgba(226,219,197,0.01) 70%, rgba(226,219,197,0.0) 70%,rgba(201,165,132,0) 100%)';

				sunSetEl.style.background = '-webkit-radial-gradient(' + this.sun.x + 'px ' + this.sun.y + 'px, circle, rgba(254,255,255,0.8) 5%,rgba(236,255,0,1) 10%,rgba(253,50,41,1) 25%, rgba(243,0,0,1) 40%,rgba(93,0,0,1) 100%)';
				sunSetEl.style.background = '-moz-radial-gradient(' + this.sun.x + 'px ' + this.sun.y + 'px, circle, rgba(254,255,255,0.8) 5%,rgba(236,255,0,1) 10%,rgba(253,50,41,1) 25%, rgba(243,0,0,1) 40%,rgba(93,0,0,1) 100%)';
				sunSetEl.style.background = '-ms-radial-gradient(' + this.sun.x + 'px ' + this.sun.y + 'px, circle, rgba(254,255,255,0.8) 5%,rgba(236,255,0,1) 10%,rgba(253,50,41,1) 25%, rgba(243,0,0,1) 40%,rgba(93,0,0,1) 100%)';

				waterReflectionContainerEl.style.perspectiveOrigin = (this.sun.x / this.myWidth * 100).toString() + "% -15%";
				waterReflectionMiddleEl.style.left = (this.sun.x - this.myWidth - (this.myWidth * .03)).toString() + "px";

				var bodyWidth = component.clientWidth;

				sunEl.style.width = (bodyWidth);
				sunEl.style.left = '0px';
				sunDayEl.style.width = (bodyWidth);
				sunDayEl.style.left = '0px';

				var sky = sunEl;
				var water = waterEl;
				var waterHeight = water.clientHeight;
				var skyHeight = sky.clientHeight;
				var skyRatio = this.sun.y / skyHeight;
				var waterRatio = waterHeight / this.myHeight;
				darknessOverlayEl.style.opacity = Math.min((this.sun.y - (this.myHeight / 2)) / (this.myHeight / 2), 1);
				darknessOverlaySkyEl.style.opacity = Math.min((this.sun.y - (this.myHeight * 7 / 10)) / (this.myHeight - (this.myHeight * 7 / 10)), 1);
				moonEl.style.opacity = Math.min((this.sun.y - (this.myHeight * 9 / 10)) / (this.myHeight - (this.myHeight * 9 / 10)), 1);
				horizonNightEl.style.opacity = (this.sun.y - (this.myHeight * 4 / 5)) / (this.myHeight - (this.myHeight * 4 / 5));

				starsContainerEl.style.opacity = (this.sun.y / this.myHeight - 0.6);

				waterDistanceEl.style.opacity = (this.sun.y / this.myHeight + 0.6);
				sunDayEl.style.opacity = (1 - this.sun.y / this.myHeight);
				skyEl.style.opacity = Math.min((1 - this.sun.y / this.myHeight), 0.99);

				sunSetEl.style.opacity = (this.sun.y / this.myHeight - 0.2);



				if (this.sun.y > 0) {
					var clouds = component.getElementsByClassName('cloud');
					for (var i = 0; i < clouds.length; i++) {
						clouds[i].style.left = Math.min(myWidth * (Math.pow(this.sun.y, 2) / Math.pow(this.myHeight / 2, 2)) * -1, 0);
					}

					var stars = component.getElementsByClassName('star');
					for (var i = 0; i < stars.length; i++) {
						stars[i].style.opacity = (this.sun.y / this.myHeight - 0.6);
					}


					if (this.sun.y > this.myHeight / 2) {
						sunEl.style.opacity = Math.min((this.myHeight - this.sun.y) / (this.myHeight / 2) + 0.2, 0.5);
						horizonEl.style.opacity = (this.myHeight - this.sun.y) / (this.myHeight / 2) + 0.2;
						waterReflectionMiddleEl.style.opacity = (this.myHeight - this.sun.y) / (this.myHeight / 2) - 0.1;
					} else {
						horizonEl.style.opacity = Math.min(this.sun.y / (this.myHeight / 2), 0.99);
						sunEl.style.opacity = Math.min(this.sun.y / (this.myHeight / 2), 0.5);
						waterReflectionMiddleEl.style.opacity = this.sun.y / (this.myHeight / 2) - 0.1;
					}

				}

				setTimeout(this.sunMove, 50)
			}
		}
	}
</script>
<template>
	<div id="skybox" style="width: 100%; height: 100%; margin: 0; padding: 0">
		<div class="starsContainer">
			<div class="stars"></div>
		</div>
		<div class="sun"></div>
		<div class="sunDay"></div>
		<div class="sunSet"></div>
		<div class="sky"></div>
		<div class="star" style="left: 250px; top: 30px;"></div>
		<div class="star" style="left: 300px; top: 25px;"></div>
		<div class="star" style="right: 40px; top: 40px;"></div>
		<div class="star" style="right: 80px; top: 45px;"></div>
		<div class="star" style="right: 120px; top: 20px;"></div>
		<div class="horizon"></div>
		<div class="horizonNight"></div>
		<div class="moon"></div>
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
		<div class="oceanRippleContainer"></div>
		<div class="oceanRipple"></div>
	</div>
</template>

<style lang="scss" scoped>
	#skybox {
		overflow: hidden;
		background-color: black;
		height: 30vh;
	}

	.water,
	.waterDistance,
	.darknessOverlay,
	.oceanRippleContainer,
	.waterReflectionContainer,
	.oceanRipple {
		display: none;
	}

	.sky,
	.horizon,
	.horizonNight,
	.sunSet,
	.sunDay,
	.darknessOverlaySky,
	.starsContainer,
	.sun {
		height: 100% !important;
	}

	.waterReflectionContainer {
		top: 100% !important;
		height: 70vh !important;
	}

	// Original CSS (more or less)
	.sun {
		position: absolute;
		top: 0px;
		left: 0%;
		width: 100%;
		height: 50%;
		background-repeat: no-repeat;
		background: -webkit-radial-gradient(bottom, circle, rgba(242,248,247,1) 0%,rgba(249,249,28,1) 3%,rgba(247,214,46,1) 8%, rgba(248,200,95,1) 12%,rgba(201,165,132,1) 30%,rgba(115,130,133,1) 51%,rgba(46,97,122,1) 85%,rgba(24,75,106,1) 100%);
		background: -moz-radial-gradient(bottom, circle, rgba(242,248,247,1) 0%,rgba(249,249,28,1) 3%,rgba(247,214,46,1) 8%, rgba(248,200,95,1) 12%,rgba(201,165,132,1) 30%,rgba(115,130,133,1) 51%,rgba(46,97,122,1) 85%,rgba(24,75,106,1) 100%);
		background: -ms-radial-gradient(bottom, circle, rgba(242,248,247,1) 0%,rgba(249,249,28,1) 3%,rgba(247,214,46,1) 8%, rgba(248,200,95,1) 12%,rgba(201,165,132,1) 30%,rgba(115,130,133,1) 51%,rgba(46,97,122,1) 85%,rgba(24,75,106,1) 100%);
		z-index: 10;
		opacity: 0.5;
	}
	.sunDay {
		position: absolute;
		top: 0px;
		left: 0px;
		width: 100%;
		height: 50%;
		background-repeat: no-repeat;
		background: -webkit-radial-gradient(bottom, circle, rgba(252,255,251,0.9) 0%,rgba(253,250,219,0.4) 30%,rgba(226,219,197,0.01) 70%, rgba(226,219,197,0.0) 70%,rgba(201,165,132,0) 100%);
		background: -moz-radial-gradient(bottom, circle, rgba(252,255,251,0.9) 0%,rgba(253,250,219,0.4) 30%,rgba(226,219,197,0.01) 70%, rgba(226,219,197,0.0) 70%,rgba(201,165,132,0) 100%);
		background: -ms-radial-gradient(bottom, circle, rgba(252,255,251,0.9) 0%,rgba(253,250,219,0.4) 30%,rgba(226,219,197,0.01) 70%, rgba(226,219,197,0.0) 70%,rgba(201,165,132,0) 100%);
		z-index: 999;
		opacity: 0.5;
	}
	.moon {
		position: absolute;
		top: 5vh;
		left: 35%;
		width: 200px;
		height: 200px;
		background-size: 200px 200px;
		background-image: url('/imgs/moon.png');
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
	.sunSet {
		position: absolute;
		top: 0px;
		left: 0px;
		width: 100%;
		height: 50%;
		background-repeat: no-repeat;
		background: -webkit-radial-gradient(bottom, circle, rgba(254,255,255,0.8) 5%,rgba(236,255,0,1) 10%,rgba(253,50,41,1) 25%, rgba(243,0,0,1) 40%,rgba(93,0,0,1) 100%);
		background: -moz-radial-gradient(bottom, circle, rgba(254,255,255,0.8) 5%,rgba(236,255,0,1) 10%,rgba(253,50,41,1) 25%, rgba(243,0,0,1) 40%,rgba(93,0,0,1) 100%);
		background: -ms-radial-gradient(bottom, circle, rgba(254,255,255,0.8) 5%,rgba(236,255,0,1) 10%,rgba(253,50,41,1) 25%, rgba(243,0,0,1) 40%,rgba(93,0,0,1) 100%);
		z-index: 999;
		opacity: 0.3;
	}
	.sky {
		position: absolute;
		top: 0px;
		left: 0px;
		width: 100%;
		height: 50%;
		z-index: 5;
		background: -webkit-linear-gradient(bottom, rgba(249,251,240,1) 10%, rgba(215,253,254,1) 20%, rgba(167,222,253,1) 40%, rgba(110,175,255,1) 100%);
		background: -moz-linear-gradient(bottom, rgba(249,251,240,1) 10%, rgba(215,253,254,1) 20%, rgba(167,222,253,1) 40%, rgba(110,175,255,1) 100%);
		background: -ms-linear-gradient(bottom, rgba(249,251,240,1) 10%, rgba(215,253,254,1) 20%, rgba(167,222,253,1) 40%, rgba(110,175,255,1) 100%);
		background: linear-gradient(bottom, rgba(249,251,240,1) 10%, rgba(215,253,254,1) 20%, rgba(167,222,253,1) 40%, rgba(110,175,255,1) 100%);
		opacity: 0.52;
	}
	.starsContainer {
		-webkit-perspective: 350;
		-moz-perspective: 350;
		perspective: 350;
		-webkit-perspective-origin: 50% 300%;
		perspective-origin: 50% 300%;
		-moz-perspective-origin: 50% 300%;
		overflow: hidden;
		position: absolute;
		top: 0px;
		left: -50%;
		width: 200%;
		height: 50%;
		z-index: 10000;
		opacity: 0;
		display:none;
	}
	.stars {
		background-repeat: repeat;
		background: url('/imgs/stars.png');
		position: absolute;
		width: 200%;
		height: 200%;
		left: -50%;
		bottom: 0px;
		opacity: 0.5;
		-webkit-transform: rotateX(-90eg);
		transform: rotateX(-90deg);
		-moz-transform: rotateX(-90deg);
		-ms-transform: rotateX(-90deg);
	}
	.mountainRange {
		position: absolute;
		left: 0px;
		width: 100%;
		bottom: 50%;
		display:none;
		z-index: 999;
	}
	.star {
		position: absolute;
		display: block;
		color: #fff;
		width: 0px;
		height: 0px;
		border-right: 10px solid transparent;
		border-bottom: 7px solid #fff;
		border-left: 10px solid transparent;
		-moz-transform: rotate(35deg);
		-webkit-transform: rotate(35deg);
		-ms-transform: rotate(35deg);
		-o-transform: rotate(35deg);
		z-index: 999;
		opacity: 0.09;
		display:none;
	}
	.star:before {
		border-bottom: 8px solid #fff;
		border-left: 3px solid transparent;
		border-right: 3px solid transparent;
		position: absolute;
		height: 0;
		width: 0;
		top: -5px;
		left: -6px;
		display: block;
		content: '';
		-webkit-transform: rotate(-35deg);
		-moz-transform: rotate(-35deg);
		-ms-transform: rotate(-35deg);
		-o-transform: rotate(-35deg);
	}
	.star:after {
		position: absolute;
		display: block;
		color: #fff;
		top: 0px;
		left: -10px;
		width: 0px;
		height: 0px;
		border-right: 10px solid transparent;
		border-bottom: 7px solid #fff;
		border-left: 10px solid transparent;
		-webkit-transform: rotate(-70deg);
		-moz-transform: rotate(-70deg);
		-ms-transform: rotate(-70deg);
		-o-transform: rotate(-70deg);
		content: '';
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
	.horizon {
		position: absolute;
		top: 0px;
		left: 0;
		width: 100%;
		height: 50%;
		background-repeat: no-repeat;
		z-index: 5;
		background: -webkit-linear-gradient(bottom, rgba(212,87,43,0.9) 0%, rgba(246,149,52,0.8) 20%,rgba(24,75,106,0) 100%);
		background: -moz-linear-gradient(bottom, rgba(212,87,43,0.9) 0%, rgba(246,149,52,0.8) 20%,rgba(24,75,106,0) 100%);
		background: -ms-linear-gradient(bottom, rgba(212,87,43,0.9) 0%, rgba(246,149,52,0.8) 20%,rgba(24,75,106,0) 100%);
		background: linear-gradient(bottom, rgba(212,87,43,0.9) 0%, rgba(246,149,52,0.8) 20%,rgba(24,75,106,0) 100%);
		opacity: 0.99;
	}
	.horizonNight {
		position: absolute;
		top: 0px;
		left: 0;
		width: 100%;
		height: 50%;
		background-repeat: no-repeat;
		z-index: 10000;
		background: -webkit-linear-gradient(bottom, rgba(57,167,255,1) 0%, rgba(13,98,245,1) 20%,rgba(0,11,22,0.1) 60%);
		background: -moz-linear-gradient(bottom, rgba(57,167,255,1) 0%, rgba(13,98,245,1) 20%,rgba(0,11,22,0.1) 60%);
		background: -ms-linear-gradient(bottom, rgba(57,167,255,1) 0%, rgba(13,98,245,1) 20%,rgba(0,11,22,0.1) 60%);
		background: linear-gradient(bottom, rgba(57,167,255,1) 0%, rgba(13,98,245,1) 20%,rgba(0,11,22,0.1) 60%);
		opacity: 0;
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
		cursor: default;
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
		background: -webkit-linear-gradient(90deg, rgba(0,0,0,0.0) 10%,rgba(0,0,0,0.20) 44%,rgba(0,0,0,0.65) 95%,rgba(0,0,0,0.62) 100%);
		background: -moz-linear-gradient(90deg, rgba(0,0,0,0.0) 10%,rgba(0,0,0,0.20) 44%,rgba(0,0,0,0.65) 95%,rgba(0,0,0,0.62) 100%);
		background: -ms-linear-gradient(90deg, rgba(0,0,0,0.0) 10%,rgba(0,0,0,0.20) 44%,rgba(0,0,0,0.65) 95%,rgba(0,0,0,0.62) 100%);
		z-index: 20;
	}
	.water {
		overflow: hidden;
		position: absolute;
		bottom: 0px;
		left: 0px;
		width: 100%;
		height: 50%;
		background-repeat: no-repeat;
		background: -webkit-linear-gradient(bottom, rgba(0,25,45,1) 0%,rgba(14,71,117,1) 35%, rgba(26,126,174,1) 70%, rgba(62,168,220,1) 100%);
		background: -moz-linear-gradient(bottom, rgba(0,25,45,1) 0%,rgba(14,71,117,1) 35%, rgba(26,126,174,1) 70%, rgba(62,168,220,1) 100%);
		background: -ms-linear-gradient(bottom, rgba(0,25,45,1) 0%,rgba(14,71,117,1) 35%, rgba(26,126,174,1) 70%, rgba(62,168,220,1) 100%);
		background: linear-gradient(bottom, rgba(0,25,45,1) 0%,rgba(14,71,117,1) 35%, rgba(26,126,174,1) 70%, rgba(62,168,220,1) 100%);
		z-index: 10;
	}
	.waterReflectionContainer {
		-webkit-perspective: 30;
		perspective: 30;
		-webkit-perspective-origin: 50% -12%;
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
		background: -webkit-radial-gradient(50% 0px, rgba(247,177,72,1) 3%,rgba(248,175,65,1) 6%,rgba(207,62,30,0.4) 35%,rgba(176,91,48,0.1) 45%,rgba(141,88,47,0.0) 60%,rgba(116,82,63,0.0) 70%,rgba(44,65,68,0.0) 80%,rgba(7,19,31,0.0) 100%);
		background: -moz-radial-gradient(50% 0px, rgba(247,177,72,1) 3%,rgba(248,175,65,1) 6%,rgba(207,62,30,0.4) 35%,rgba(176,91,48,0.1) 45%,rgba(141,88,47,0.0) 60%,rgba(116,82,63,0.0) 70%,rgba(44,65,68,0.0) 80%,rgba(7,19,31,0.0) 100%);
		background: -ms-radial-gradient(50% 0px, rgba(247,177,72,1) 3%,rgba(248,175,65,1) 6%,rgba(207,62,30,0.4) 35%,rgba(176,91,48,0.1) 45%,rgba(141,88,47,0.0) 60%,rgba(116,82,63,0.0) 70%,rgba(44,65,68,0.0) 80%,rgba(7,19,31,0.0) 100%);
		z-index: 999;
		opacity: 0.7;
		-webkit-transform: rotateX(45deg);
	}
	.waterReflectionMiddleThin {
		position: absolute;
		bottom: 0px;
		left: 0px;
		width: 100%;
		height: 100%;
		background-repeat: no-repeat;
		background: -webkit-linear-gradient(left, rgba(69,70,61,0.0) 3%,rgba(216,100,38,0.10) 32%,rgba(252,176,48,0.35) 35%,rgba(253,215,79,1) 45%,rgba(253,254,225,1) 48%,rgba(253,254,225,1) 52%, rgba(024,194,214,1) 55%, rgba(034,204,234,0.10) 65%, rgba(034,204,234,0.10) 60%, rgba(034,204,234,0.0) 97%);
		background: -moz-linear-gradient(left, rgba(69,70,61,0.0) 3%,rgba(216,100,38,0.10) 32%,rgba(252,176,48,0.35) 35%,rgba(253,215,79,1) 45%,rgba(253,254,225,1) 48%,rgba(253,254,225,1) 52%, rgba(024,194,214,1) 55%, rgba(034,204,234,0.10) 65%, rgba(034,204,234,0.10) 60%, rgba(034,204,234,0.0) 97%);
		background: -ms-linear-gradient(left, rgba(69,70,61,0.0) 3%,rgba(216,100,38,0.10) 32%,rgba(252,176,48,0.35) 35%,rgba(253,215,79,1) 45%,rgba(253,254,225,1) 48%,rgba(253,254,225,1) 52%, rgba(024,194,214,1) 55%, rgba(034,204,234,0.10) 65%, rgba(034,204,234,0.10) 60%, rgba(034,204,234,0.0) 97%);
		background: linear-gradient(left, rgba(69,70,61,0.0) 3%,rgba(216,100,38,0.10) 32%,rgba(252,176,48,0.35) 35%,rgba(253,215,79,1) 45%,rgba(253,254,225,1) 48%,rgba(253,254,225,1) 52%, rgba(024,194,214,1) 55%, rgba(034,204,234,0.10) 65%, rgba(034,204,234,0.10) 60%, rgba(034,204,234,0.0) 97%);
		z-index: 999;
		-webkit-transform: rotateX(45deg);
		-moz-transform: rotateX(45deg);
		-ms-transform: rotateX(45deg);
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
	.oceanRipple {
		background-image: repeating-linear-gradient(175deg,rgba(165,165,165,0.08) 43%, rgba(175,175,175,0.08) 45%, rgba(235,235,235,0.08) 49%, rgba(195,195,195,0.08) 50%, rgba(165,165,165,0.08) 54%);
		opacity: 0.5;
		position: absolute;
		left: 0%;
		bottom: 0px;
		width: 100%;
		height: 50%;
		z-index: 10;
	}
</style>