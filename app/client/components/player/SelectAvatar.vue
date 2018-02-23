<script>
	import Sprite from '../common/Sprite.vue';
	export default {
		name: 'SelectAvatar',
		props: ['game'],
		components: { Sprite },
		methods: {
			select(avatar) {
				this.game.client.selectAvatar(avatar)
			}
		}
	}
</script>

<template>
	<div id="SelectAvatar" class="view">
		<h1>Select Avatar</h1>
		<div class="avatars">
			<div class="avatar" v-for="avatar in 20" @click="select(avatar)">
				<img :src="`/imgs/avatars/${avatar}.png`" />
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	.avatars {
		display: grid;
		grid-template-columns: 25% 25% 25% 25%;
		min-width: 320px;
		max-width: 600px;
		margin: 5px auto;
		.avatar {
			width: 80px;
			height: 100px;
			margin: auto;
			:hover {
				outline: 2px solid black;
			}
		}
	}
</style>
