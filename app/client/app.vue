<template>
	<div id="app">
		<h1 class="ui dividing centered header">Vue.js Todo App</h1>
		<div class='ui three column centered grid'>
			<div class='column'>
				<test></test>
			</div>
		</div>
	</div>
</template>

<script>
import Test from './components/Test.vue';

export default {
	name: 'app',
	components: {
		Test
	},
	data() {
		return {
			oh: 'dear'
		}
	},
	methods: {
		nice() {

		}
	},
};
</script>
