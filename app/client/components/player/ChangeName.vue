<script>
	export default {
		name: 'ChangeName',
		props: ['game'],
		data() {
			return {
				name: this.game.player.name
			}
		},
		methods: {
			change(name) {
				this.game.client.changeName(name)
				this.$emit('changed')
			}
		}
	}
</script>

<template>
	<div id="ChangeName" class="view">
		<h1>Change Name</h1>
		<div class="form-view">
			<form class="form-group"  @submit="change(name)" @submit.prevent>
				<input v-model="name" />
				<input type="submit" class="btn blue" value="Done" />
			</form>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	input {
		text-transform: uppercase;
	}
</style>
