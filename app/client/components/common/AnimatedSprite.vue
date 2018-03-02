<script>
	export default {
		name: 'AnimatedSpirte',
		props: ['data'],
		data() {
			return {
				img: null,
				width: null,
				height: null,
				fps: null,
				frames: [[]],
				cycles: {},
				cycle: null,
				cycleFrame: null,
				frame: null,
				playing: false
			}
		},
		created() {
			this.img = this.data.img
			this.width = this.data.width
			this.height = this.data.height
			this.fps = this.data.fps
			this.cycles = this.data.cycles
			this.frames = this.data.frames
			this.frame = this.frame ? this.frame : this.frames[0][Object.keys(this.frames[0])[0]]
		},
		methods: {
			play(cycle) {
				if (this.playing) {
					return this.stop()
				}
				this.playing = true
				this.cycleFrame = 0
				this.cycle = cycle
				this.frame = this.cycles[this.cycle][this.cycleFrame]
				setTimeout(this.playNext, this.delay)
			},
			playNext() {
				if (this.playing) {
					this.cycleFrame = ++this.cycleFrame % this.cycles[this.cycle].length
					this.frame = this.cycles[this.cycle][this.cycleFrame]
					setTimeout(this.playNext, this.delay)
				}
			},
			stop() {
				this.playing = false
			}
		},
		computed: {
			style() {
				return {
					display: 'inline-block',
					width: `${this.width}px`,
					height: `${this.height}px`,
					backgroundImage: `url(${this.img})`,
					backgroundPosition: `${this.pos[0]}px ${this.pos[1]}px`
				}
			},
			pos() {
				let position = null;
				this.frames.forEach((row, y) => row.forEach((frame, x) => {
					if (frame === this.frame) {
						position = [-x * this.width, -y * this.height]
					}
				}))
				return position ? position : [0, 0]
			},
			delay() {
				return 1000 / this.fps
			}
		}
	}
</script>

<template>
	<div v-bind:style="[style]" @click="play('walk')"></div>
</template>
