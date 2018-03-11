<script>
	import Loader from './Loader.vue'
	export default {
		name: 'avatar',
		props: ['player'],
		components: { Loader }
	}
</script>

<template>
	<div class="avatar">
		<img v-if="player.avatar" :src="`/imgs/avatars/${player.avatar}.png`"/>
		<Loader v-if="!player.avatar" class="loader"></Loader>
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
	}
</style>