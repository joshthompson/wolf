class Action {
	constructor(data) {
		this.created
		this.data
		data = typeof data === 'object' ? data : {}
		// Set Created
		if (data.create instanceof Date) this.created = data.created
		else if (typeof data.create === 'string') this.created = new Date(data.created)
		else this.created = new Date()
		// Set data
		this.data = data.data
	}
}

module.exports = Action
