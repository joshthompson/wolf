var Player = require('./Player.model')

class Vote {
	constructor(voter, vote) {
		this.voter = voter
		this.vote = vote
	}
}

module.exports = Vote
