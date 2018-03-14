<script>
	export default {
		name: 'Countdown',
		props: ['value', 'speed'],
		data() {
			return {
				timer: 0,
				countdownSpeed: 1000
			}
		},
		created() {
			this.timer = Math.floor(this.value)
			this.countdownSpeed = typeof this.speed === 'number' ? this.speed : this.countdownSpeed
			setTimeout(this.countdown, this.countdownSpeed)
		},
		methods: {
			countdown() {
				this.timer--
				if (this.timer === 0) {
					this.$emit('complete')
				} else {
					setTimeout(this.countdown, this.countdownSpeed)
				}
			}
		}

	}
</script>

<template>
	<div class="countdown">
		{{ timer }}
	</div>
</template>
