class GameCode {
	
	// private disallowed
	
	constructor(length) {
		this.length = length
		this.code = this.generate()
	}

	generate(length) {
		let code = ''
		let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
		chars = [
			'KEWL',
			'WOLF',
			'MOON',
			'BITE',
			'NICE',
			'WERE',
			'EYES',
			'SEER',
			'FOOL',
			'YOYO',
			'KNUT',
			'MARI',
			'ANAC',
			'CARA',
			'ANJO',
			'DOOM',
			'MIST',
			'WOOO',
			'BOOO',
			'WEST',
			'EAST',
			'FOUL',
			'HUND',
			'EVIL',
			'VARG', // Swedish
			'LOBO', // Portuguese
			'LLOP', // Catalan
			'HUNT', // Estonian
			'LUPO', // Esperanto
			'KURT' // Turkish
		]
		while (code.length < this.length) {
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

module.exports = GameCode
