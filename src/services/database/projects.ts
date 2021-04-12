import { IProject } from '../../interfaces/project'
import connectToDatabase from './connect'

export async function add (project: IProject) {
	const db = await connectToDatabase()
	const collection = db.collection('projects')

	return await collection.insertOne({ ...project })
}

export async function getByUser (userId: string) {
	const db = await connectToDatabase()
	const collection = db.collection('projects')

	return await collection.find({ userId }).sort({ createdAt: -1 }).toArray()
}
