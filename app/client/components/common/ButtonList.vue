<script>
	export default {
		name: 'ButtonList',
		props: {
			options: Array
		},
		computed: {
			processedOptions() {
				return this.options.map(option => {
					return typeof option === 'object' ? option : {
						value: option,
						text: option,
						badge: null
					}
				})
			}
		},
		methods: {
			select(value) {
				this.$emit('select', value)
			}
		}
	}
</script>

<template>
	<ul>
		<li v-for="option in processedOptions">
			<a @click="select(option.value)" class="btn">
				<span v-if="option.text">{{ option.text }}</span>
				<span v-if="option.badge" class="badge">{{ option.badge }}</span>
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
				position: relative;
				.badge {
					position: absolute;
					right: 10px;
					display: inline-block;
					background: black;
					color: white;
					border-radius: 16px;
					line-height: 34px;
					height: 32px;
					min-width: 32px;
					padding: 0px 5px;
				}
			}
		}
	}
</style>
