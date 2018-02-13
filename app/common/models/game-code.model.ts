export class GameCode {
	private code: string
	// private disallowed: string[]
	// private length: number = 4
	// private allowedChars: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
	constructor(code?: string) {
		this.code = code ? code : 'ABCD'
	}
	get(): string {
		return this.code
	}
	set(code: string): void {
		this.code = code ? code.substr(0, 4) : null
	} 
	toString(): string {
		return this.code
	}
	toJSON(): string {
		return this.code
	}
}
