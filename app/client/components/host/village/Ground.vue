<script>
	export default {
		name: 'Sky'
	}
</script>

<template>
	<div class="ground-container">
		<div class="ground"></div>
		<div class="ground-shadow"></div>
	</div>
</template>

<style lang="scss" scoped>
	@import '../../../style/mixins.scss';
	$height: 70vh;
	$transition: 5s;
	.ground-container {
		position: relative;
		z-index: 1;
	}
	.ground-shadow {
		height: $height;
		margin-bottom: -$height;
		@include radialGradient(50% 75%, rgba(0, 0, 0, 0) 25%, rgba(0, 0, 0, 0.6) 100%);
	}
	.ground {
		height: $height;
		margin-bottom: -$height;
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
</style>