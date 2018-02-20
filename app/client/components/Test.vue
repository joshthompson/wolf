<template>
	<div>

		Message: {{ msg }}

		<!-- <div>
			Mode: {{ mode }}<br/>
			Game code: {{ game.code }}
		</div> -->

		<!-- <div v-if="true">
			<div><button id="create-btn">Create</button></div>
			<hr />
			<div>
				<input type="text" id="player-name" placeholder="player-name" />
				<input type="text" id="game-code" placeholder="game-code" />
				<button id="join-btn">Join</button>
			</div>
		</div> -->
	</div>

	<!-- <div class="sky">
		<h1 style="font-size: 72px;">🐺</h1>
		<h1 style="font-size: 82px; margin: -145px 0px 0px 0px;">🌙</h1>
		<h1 style="font-size: 72px; margin: -40px 0px 0px 0px;">🌲🌲🌲🌲🌲🌲🌲</h1>
		<h1 style="font-size: 72px; margin: -80px 0px 0px 0px;">🌲🌲🌲🌲🌲🌲🌲🌲</h1>
		<div class="ground"></div>
	</div> -->
</template>

<script>
	export default {
		name: 'test',
		data() {
			return {
				msg: 'Hello from vue-loader!'
			}
		}
	}
</script>
