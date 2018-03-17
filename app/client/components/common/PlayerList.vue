<script>
	export default {
		name: 'PlayerList',
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
	<div class="title-card">
		<ul>
			<li v-for="player in players">
				<a @click="select(player)" class="btn">
					{{ player.name }}
				</a>
			</li>
		</ul>
	</div>
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
