<script>
	import Avatar from '../common/Avatar.vue';
	import ChangeName from './ChangeName.vue';
	import SelectAvatar from './SelectAvatar.vue';
	export default {
		name: 'PlayerReady',
		props: ['game'],
		components: { Avatar, ChangeName, SelectAvatar },
		data() {
			return {
				state: 'NEUTRAL'
			}
		},
		methods: {
			neutral() {
				this.state = 'NEUTRAL'
			},
			changeName() {
				this.state = 'CHANGING_NAME'
			},
			changeAvatar() {
				this.state = 'CHANGING_AVATAR'
			}
		}
	}
</script>

<template>
	<div id="SelectAvatar">

		<div v-if="state === 'NEUTRAL'" class="view">
			<h1>{{ game.player.name }} </h1>
			<h1>{{ game.player.character }} </h1>
			<avatar :player="game.player"></avatar>
			<p>Waiting for game to start</p>
			<div class="form-view">
				<div class="form-group">
					<button @click="changeName()" class="btn blue">Change Name</button>
					<button @click="changeAvatar()" class="btn blue">Change Avatar</button>
				</div>
			</div>
		</div>

		<ChangeName v-if="state === 'CHANGING_NAME'" :game="game" @changed="neutral()"></ChangeName>
		<SelectAvatar v-if="state === 'CHANGING_AVATAR'" :game="game" @set="neutral()"></SelectAvatar>

	</div>
</template>

<style lang="scss" scoped>
</style>
