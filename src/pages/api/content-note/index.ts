import { NextApiRequest, NextApiResponse } from 'next'
import { getByDate, add } from '../../../services/database/content-notes'

export default async (request: NextApiRequest, response: NextApiResponse) => {
	if (request.method === 'GET') {
		const { date } = request.query
		const contentNotes = await getByDate(date.toString())
		return response.json({ contentNotes })
	}

	if (request.method === 'POST') {
		const { ...contentNote } = request.body
		await add(contentNote)
		return response.status(201).send({ message: 'success' })
	} else {
		return response.json({ error: 'erro' })
	}
}
