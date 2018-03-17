<script>
	import PlayerAvatar from '../../common/PlayerAvatar.vue'
	import ChangeName from './ChangeName.vue'
	import SelectAvatar from './SelectAvatar.vue'
	export default {
		name: 'PlayerReady',
		components: { PlayerAvatar, ChangeName, SelectAvatar },
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
			<h1>{{ $root.game.player.name }} </h1>
			<PlayerAvatar :player="$root.game.player" />
			<p>Waiting for game to start</p>
			<div class="form-view">
				<div class="form-group">
					<button @click="changeName()" class="btn">Change Name</button>
					<button @click="changeAvatar()" class="btn">Change Avatar</button>
				</div>
			</div>
		</div>

		<ChangeName v-if="state === 'CHANGING_NAME'" @changed="neutral()" />
		<SelectAvatar v-if="state === 'CHANGING_AVATAR'" @set="neutral()" />

	</div>
</template>
