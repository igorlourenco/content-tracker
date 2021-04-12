import { ObjectID } from 'mongodb'
import IContentNote from '../../interfaces/content-note'
import connectToDatabase from './connect'

export async function add (contentNote: IContentNote) {
	const db = await connectToDatabase()
	const collection = db.collection('content_notes')

	return await collection.insertOne({ ...contentNote })
}

export async function getByDate (startDate: string, finalDate: string, project: string) {
	const db = await connectToDatabase()
	const collection = db.collection('content_notes')

	return await collection.find({
		date: {
			$gte: startDate,
			$lt: finalDate
		},
		project
	}).sort({ date: -1 }).toArray()
}

export async function update (contentNote: IContentNote) {
	const db = await connectToDatabase()
	const collection = db.collection('content_notes')

	const { _id, ...contentNoteData } = contentNote

	return await collection.updateOne({ _id: new ObjectID(_id) }, { $set: { ...contentNoteData } })
}

export async function _delete (_id: string) {
	const db = await connectToDatabase()
	const collection = db.collection('content_notes')

	await collection.deleteOne({ _id: new ObjectID(_id) })
}
