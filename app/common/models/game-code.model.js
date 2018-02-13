export class GameCode {
	// private disallowed
	// private length = 4
	// private allowedChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
	constructor(code) {
		this.code = code ? code : 'ABCD'
	}
	code() {
		return this.code
	}
	set(code) {
		this.code = code ? code.substr(0, 4) : null
	} 
	toString() {
		return this.code
	}
	toJSON() {
		return this.code
	}
}
