var app = require('express')()
var http = require('http').Server(app)
var io = require('socket.io')(http)

// Socket.io Test
let i = 0
let connected = false

let send = () => {
	if (connected) {
		let obj = {kewl: 'beans', i: i++}
		io.emit('flaps', obj)
		console.log(obj)
	}
	setTimeout(send, 500)
}
send()

io.on('connection', (socket) => {
	console.log('a user connected')
	connected = true
	socket.on('disconnect', (reason) => {
		console.log('a user disconnected')
		connected = false
	})
})

http.listen(3000, () => {
	console.log('listening on *:3000')
})
