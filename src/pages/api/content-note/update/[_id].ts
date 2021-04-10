import { NextApiRequest, NextApiResponse } from 'next'
import { update } from '../../../../services/database/content-notes'

export default async (request: NextApiRequest, response: NextApiResponse) => {
	const { _id } = request.query
	const { ...contentNote } = request.body
	await update({ _id, ...contentNote })
	return response.status(201).send({ message: 'success' })
}
