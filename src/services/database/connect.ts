import { MongoClient, Db } from 'mongodb'
import url from 'url'

let cachedDb: Db | null = null

async function connectToDatabase () {
	if (cachedDb) {
		return cachedDb
	}

	const client = await MongoClient.connect(process.env.DATABASE_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})

	const dbName = url.parse(process.env.DATABASE_URI).pathname.substr(1)

	const db = client.db(dbName)

	cachedDb = db

	return db
}

export default connectToDatabase
