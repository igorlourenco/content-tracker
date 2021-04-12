import { NextApiRequest, NextApiResponse } from 'next'
import { Session } from 'next-auth'
import { getSession } from 'next-auth/client'
import { getByUser, add } from '../../../services/database/projects'

interface SessionWithId extends Session {
	id?: string
}

export default async (request: NextApiRequest, response: NextApiResponse) => {
	const session: SessionWithId = await getSession({ req: request })

	const { id } = session

	if (request.method === 'GET') {
		if (session) {
			const projects = await getByUser(id)
			return response.json({ projects })
		}
	}

	if (request.method === 'POST') {
		if (session) {
			const { ...project } = request.body
			await add({ userId: id, ...project })
			return response.status(201).send({ message: 'success' })
		}
	} else {
		return response.json({ error: 'erro' })
	}
}
