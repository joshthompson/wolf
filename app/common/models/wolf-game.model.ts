import { GameCode } from './game-code.model'
import { Player } from './player.model'
import { Accusation } from './accusation.model'
import { Vote } from './vote.model'
import { Action } from './action.model'
import { EventEmitter } from 'events'

export class WolfGame {
	// Game data
	private id: number
	private created: Date = new Date()
	private code: GameCode = new GameCode()
	private players: Player[] = []
	private status: string = null // 'SETUP' | 'INTRO' | 'DAY' | 'NIGHT' | 'END' | null = 'SETUP'
	private subStatus: string = null
	private accusations: Accusation[] = []
	private votes: Vote[] = []
	private token: string
	private history: Action[] = []

	public event: EventEmitter = new EventEmitter();

	public constructor(data?: any) {
		data = typeof data === 'object' ? data : {}
		// Set ID
		if (typeof data.id === 'number') this.id = data.id
		// Set Created
		if (data.create instanceof Date) this.created = data.created
		else if (typeof data.create === 'string') this.created = new Date(data.created)
		else this.created = new Date()
		// Set Code
		if (data.code instanceof GameCode) this.code = data.code
		else if (typeof data.code === 'string') this.code = new GameCode(data.code)
		// Set Players
		if (data.players instanceof Array) {
			data.players.forEach((player: any) => {
				if (player instanceof Player) this.players.push(player)
				else this.players.push(new Player(player))
			})
		}
		// Set Status
		if (typeof data.status === 'string') this.status = data.status
		// Set Sub Status
		if (typeof data.subStatus === 'string') this.subStatus = data.subStatus
		// Set Accusations
		if (data.accusations instanceof Array) {
			data.accusations.forEach((accusation: any) => {
				if (accusation instanceof Accusation) this.accusations.push(accusation)
				else this.accusations.push(new Accusation(accusation))
			})
		}
		// Set Votes
		if (data.votes instanceof Array) {
			data.votes.forEach((vote: any) => {
				if (vote instanceof Vote) this.votes.push(vote)
				else this.votes.push(new Vote(vote))
			})
		}
		// Set Token
		if (typeof data.token === 'string') this.token = data.token
		// Set History
		if (data.history instanceof Array) {
			data.history.forEach((action: any) => {
				if (history instanceof Vote) this.history.push(action)
				else this.history.push(new Action(action))
			})
		}
	}

	private update():void {
		this.event.emit('update');
	}

	private init() {}
	private runDay() {}
	private runNight() {}
	private end() {}

	private listen() {
		// Listen for player_join
		// Listen for player_change
		// Listen for player_leave
		// Listen for player_action
	}

	private emitEvent() {
		// Emit game_state
		// Emit game_action
	}

	public getId(): number {
		return this.id
	}

	public setId(id: number): void {
		this.id = id
	}

	public setToken(token: string) {
		this.token = token;
	}

}
