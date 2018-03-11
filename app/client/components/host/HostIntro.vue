<script>
	import Avatar from '../common/Avatar.vue'
	import Shadow from './village/Shadow.vue'
	export default {
		name: 'HostSetup',
		props: ['game'],
		components: { Avatar, Shadow }
	}
</script>

<template>
	<div id="host-setup">
		<div class="players">
			<avatar :player="player" class="village-object"></avatar>
		</div>
	</div>
</template>