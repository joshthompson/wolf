import { Player } from './player.model'

export class Vote {
	voter: Player
	vote: Player
	constructor(data: any) {
		// Set Voter
		if (data.voter instanceof Player) this.voter = data.voter
		else this.voter = new Player(data.voter)
		// Set Vote
		if (data.vote instanceof Player) this.vote = data.vote
		else this.vote = new Player(data.vote)
	}
}
