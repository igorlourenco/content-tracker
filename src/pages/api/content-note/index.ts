import { NextApiRequest, NextApiResponse } from 'next'
import { Session } from 'next-auth'
import { getSession } from 'next-auth/client'
import { getByDate, add } from '../../../services/database/content-notes'

interface SessionWithId extends Session {
	id?: string
}

export default async (request: NextApiRequest, response: NextApiResponse) => {
	const session: SessionWithId = await getSession({ req: request })
	const { id } = session

	if (request.method === 'GET') {
		if (session) {
			const { startDate, finalDate, project } = request.query
			const contentNotes = await getByDate(startDate.toString(), finalDate.toString(), project.toString())
			return response.json({ contentNotes })
		}
	}

	if (request.method === 'POST') {
		if (session) {
			const { ...contentNote } = request.body
			await add({ userId: id, ...contentNote })
			return response.status(201).send({ message: 'success' })
		}
	} else {
		return response.json({ error: 'erro' })
	}
}
