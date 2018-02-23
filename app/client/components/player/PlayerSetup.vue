<script>
	import SelectAvatar from './SelectAvatar.vue';
	import MessageView from '../common/MessageView.vue';
	export default {
		name: 'PlayerSetup',
		props: ['game'],
		components: { SelectAvatar, MessageView }
	}
</script>

<template>
	<div id="PlayerSetup">
		<SelectAvatar :game="game" v-if="game.player.state === 'SELECT_AVATAR'"></SelectAvatar>
		<MessageView
			v-if="game.player.state === 'READY'"
			:title="game.player.name"
			:message="'Waiting for game to start'">
		</MessageView>
	</div>
</template>
