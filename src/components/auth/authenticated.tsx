import React from 'react'
import { useSession } from 'next-auth/client'

type AuthenticatedProps = {
	page?: string
	children: any
}

const Authenticated = ({ page, children }: AuthenticatedProps) => {
	const [session, loading] = useSession()

	if (typeof window !== 'undefined' && loading) return null

	if (!session) return <h1>vc precisa estar logado</h1>

	return children
}

export default Authenticated
