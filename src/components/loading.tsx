import React from 'react'
import { Stack, Spinner } from '@chakra-ui/react'

const Loading = () => {
	return (
		<Stack width="100vw" height="100vh" alignItems="center" justifyContent="center">
			<Spinner />
		</Stack>
	)
}

export default Loading
