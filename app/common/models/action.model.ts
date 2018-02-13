export class Action {
	private created: Date
	private data: Object
	constructor(data?: any) {
		data = typeof data === 'object' ? data : {}
		// Set Created
		if (data.create instanceof Date) this.created = data.created
		else if (typeof data.create === 'string') this.created = new Date(data.created)
		else this.created = new Date()
		// Set data
		this.data = data.data
	}
}
