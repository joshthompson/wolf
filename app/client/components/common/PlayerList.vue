<script>
	// import ButtonList from './ButtonList.vue' // TODO: Update to use button list
	export default {
		name: 'PlayerList',
		// components: { ButtonList },
		props: {
			players: Array
		},
		methods: {
			select(player) {
				this.$emit('select', player)
			}
		}
	}
</script>

<template>
	<ul>
		<li v-for="player in players">
			<a @click="select(player)" class="btn">
				{{ player.name }}
			</a>
		</li>
	</ul>
</template>

<style lang="scss" scoped>
	ul {
		list-style-type: none;
		padding: 0px 20px;
		li {
			display: block;
			margin-top: 5px;
			&:nth-child(1) {
				margin-top: 0px;
			}
			a {
				display: block;
			}
		}
	}
</style>
