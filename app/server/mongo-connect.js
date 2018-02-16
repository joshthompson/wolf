var MongoClient = require('mongodb').MongoClient

// MongoDB Test
MongoClient.connect('mongodb://localhost:27017/', (err, connection) => {
	if (err) throw err
	let games = connection.db('wolf').collection('games')
	games.find({id: 29}).toArray((err, result) => {
		if (err) throw err
		console.log('MONGO:', result)
		connection.close()
	})
})
