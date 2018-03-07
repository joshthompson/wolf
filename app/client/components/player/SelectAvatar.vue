<script>
	export default {
		name: 'SelectAvatar',
		props: ['game'],
		methods: {
			select(avatar) {
				if (this.selectable(avatar)) {
					this.game.client.selectAvatar(avatar)
					this.$emit('set')
				}
			},
			selectable(avatar) {
				return !this.game.game.players.filter(player => player.avatar === avatar).length
			}
		}
	}
</script>

<template>
	<div id="SelectAvatar" class="view">
		<h1>Select Avatar</h1>
		<div class="avatars">
			<div class="avatar" v-for="avatar in 21" @click="select(avatar)" :class="{taken: !selectable(avatar)}">
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
			cursor: pointer;
			&:not(.taken):hover {
				outline: 2px solid black;
			}
			&.taken {
				opacity: 0.5;
				cursor: not-allowed;
				pointer-events: none;
			}
		}
	}
</style>
