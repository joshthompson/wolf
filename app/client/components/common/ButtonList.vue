<script>
	export default {
		name: 'ButtonList',
		props: {
			options: Array
		},
		methods: {
			select(option) {
				this.$emit('select', option)
			}
		}
	}
</script>

<template>
	<ul>
		<li v-for="option in options">
			<a @click="select(option)" class="btn" v-html="option"></a>
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
