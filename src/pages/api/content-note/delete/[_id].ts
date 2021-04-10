import { NextApiRequest, NextApiResponse } from 'next'
import { _delete } from '../../../../services/database/content-notes'

export default async (request: NextApiRequest, response: NextApiResponse) => {
	const { _id } = request.query
	await _delete(_id.toString())
	return response.status(201).send({ message: 'success' })
}
