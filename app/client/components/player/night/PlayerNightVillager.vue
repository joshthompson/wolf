<script>
	import ButtonList from '../../common/ButtonList.vue'
	import PlayerList from '../../common/PlayerList.vue'
	export default {
		name: 'PlayerNightVillager',
		components: { ButtonList, PlayerList },
		data() {
			return {
				selected: false,
				question: null,
				trivia: null,
				next: null,
				thing: null
			}
		},
		created() {
			// Just ask village dumb question so they've got something to do
			let things = [
				'coolest player',
				'best dressed',
				'best liar',
				'worst liar',
				'funniest',
				'best parent',
				'oldest player',
				'youngest player',
				'strongest'
			]
			this.thing = things[Math.floor(Math.random() * things.length)]
			this.getQuestion()
		},
		methods: {
			vote(player) {
				this.selected = true
				this.$root.game.client.villagerNight(player.id, this.thing),
				this.getQuestion()
			},
			getQuestion() {
				let url = 'https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple&encode=base64'
				this.trivia = this.next
				this.$http.get(url).then(response => {
					this.next = response.body.results[0]
					this.next.question = atob(this.next.question)
					this.next.correct_answer = atob(this.next.correct_answer)
					for (let i = 0; i < this.next.incorrect_answers.length; i++) {
						this.next.incorrect_answers[i] = atob(this.next.incorrect_answers[i])
					}
					this.next.options = [this.next.correct_answer, ...this.next.incorrect_answers]
					this.next.options = this.shuffle(this.trivia.options)
				})
			},
			shuffle(a) {
				for (let i = a.length - 1; i > 0; i--) {
					const j = Math.floor(Math.random() * (i + 1))
					[a[i], a[j]] = [a[j], a[i]]
				}
				return a
			},
			answer(answer) {
				if (this.trivia.correct_answer === answer) {
					alert('Correct')
				} else {
					alert('Incorrect')
				}
				this.getQuestion()
			}
		}
	}
</script>

<template>
	<div id="PlayerNightVillager" class="view">

		<h1>Night {{ $root.game.game.day + 1 }}</h1>

		<div v-if="!selected">
			<p>Who do you think the {{ thing }} is?</p>
			<PlayerList
				@select="vote($event)"
				:players="$root.game.game.players"
			/>
		</div>

		<div v-else-if="selected && trivia">
			<p>{{ trivia.question }}</p>
			<ButtonList
				@select="answer($event)"
				:options="trivia.options"
			/>
		</div>

	</div>
</template>
