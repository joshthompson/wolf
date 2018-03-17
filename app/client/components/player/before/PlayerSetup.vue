<script>
	import SelectAvatar from './SelectAvatar.vue';
	import PlayerReady from './PlayerReady.vue';
	import MessageView from '../../common/MessageView.vue';
	export default {
		name: 'PlayerSetup',
		components: { SelectAvatar, PlayerReady, MessageView }
	}
</script>

<template>
	<div id="PlayerSetup">
		<SelectAvatar v-if="$root.game.player.state === 'SELECT_AVATAR'" />
		<PlayerReady v-if="$root.game.player.state === 'READY'" />
		<!-- <MessageView
			v-if="$root.game.player.state === 'READY'"
			:title="$root.game.player.name"
			:message="'Waiting for game to start'">
		</MessageView> -->
	</div>
</template>
