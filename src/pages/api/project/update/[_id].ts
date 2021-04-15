import { NextApiRequest, NextApiResponse } from 'next'
import { update } from '../../../../services/database/projects'

export default async (request: NextApiRequest, response: NextApiResponse) => {
	const { _id } = request.query
	const { ...project } = request.body
	await update({ _id, ...project })
	return response.status(201).send({ message: 'success' })
}
