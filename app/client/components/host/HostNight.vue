<script>
	import Avatar from '../common/Avatar.vue'
	import TitleCard from '../common/TitleCard.vue'
	import Shadow from './village/Shadow.vue'
	export default {
		name: 'HostSetup',
		components: { Avatar, TitleCard, Shadow }
	}
</script>

<template>
	<div id="host-setup">
		<TitleCard :text="`Night ${$root.game.game.day + 1}`"></TitleCard>
		<h1>Night {{ $root.game.game.day + 1 }}</h1>
		<div class="players">
			<avatar
				v-for="player in $root.game.game.players"
				:key="player.id"
				:player="player"
				class="village-object"
			/>
		</div>
	</div>
</template>
