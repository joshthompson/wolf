class RoomCode {
	
	// private disallowed
	
	constructor(code) {
		this.length = 4
		this.code = code ? code.toUpperCase() : RoomCode.generate(this.length)
	}

	static generate(length) {
		let code = ''
		let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
		while (code.length < length) {
			code = code + chars[Math.floor(Math.random() * chars.length)]
		}
		return code
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

module.exports = RoomCode
