<script>
	function deepClone(vnodes, createElement) {
		function cloneVNode (vnode) {
			const clonedChildren = vnode.children && vnode.children.map(vnode => cloneVNode(vnode))
			const cloned = createElement(vnode.tag, vnode.data, clonedChildren)
			cloned.text = vnode.text
			cloned.isComment = vnode.isComment
			cloned.componentOptions = vnode.componentOptions
			cloned.elm = vnode.elm
			cloned.context = vnode.context
			cloned.ns = vnode.ns
			cloned.isStatic = vnode.isStatic
			cloned.key = vnode.key
			return cloned
		}
		return vnodes.map(vnode => cloneVNode(vnode))
	}
	export default {
		name: 'Shadow',
		props: ['game', 'offset'],
		data() {
			return {
				origin: `50% calc(100% - ${this.offset/2}px)`,
				opacity: null,
				scale: null,
				skew: null
			}
		},
		created() {
			this.update()
		},
		methods: {
			update() {
				this.opacity = this._opacity()
				this.scale = this._scale()
				this.skew = this._skew()
				setTimeout(this.update, this.game.refresh)
			},
			_opacity() {
				let opacity = 0
				if (this.game.time >= 6.5 && this.game.time <= 17.5) {
					opacity = 0.2 + Math.abs(12 - this.game.time) / 6.875 // Day time
				} else if (this.game.time >= 6 && this.game.time <= 18) {
					opacity = (1 - (Math.abs(12 - this.game.time) - 5)) / 0.5 // Sunrise / sunset
				} else {
					opacity = 0
				}
				return opacity / 4
			},
			_scale() {
				let height = 0.5 + Math.abs(12 - this.game.time) / 12
				return `scaleY(-${height})`
			},
			_skew() {
				let deg = (12 - this.game.time) * -9
				return `skew(${deg}deg, 0deg)`
			}
		},
		render(createElement) {
			return createElement(
				'div',
				{
					class: 'shadow-container'
				},
				[
					createElement(
						'div', {
							class: 'original',
							style: `margin-bottom: -${this.offset}px`
						},
						[
							...this.$slots.default
						]
					),
					createElement(
						'div', {
							class: 'shadow',
							style: `opacity: ${this.opacity}`
						},
						[
							createElement(
								'div', {
									class: 'shadow-inner',
									style: `transform-origin: ${this.origin}; transform: ${this.skew}`
								},
								[
									...deepClone(this.$slots.default, createElement)
								]
							)
						]
					)
				]
			)
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../../style/mixins.scss';
	.shadow-container {
		display: inline-block;
		.original {
			display: block;
			position: relative;
			z-index: 2;
		}
		.shadow {
			display: block;
			position: relative;
			z-index: 1;
			filter: brightness(0) blur(2px);
			transform: scaleY(-1);
			@include userSelect(none);
			pointer-events: none;
		}
	}
</style>
