import React from 'react'
import { Stack, Heading, Text } from '@chakra-ui/react'
import NewProject from '../project/new-project'

const FirstProject = () => {
	return (
		<Stack spacing={8} alignItems="center" justifyContent="center">
			<Stack alignItems="center" justifyContent="center">
				<Heading>Você ainda não tem nenhum projeto</Heading>
				<Text>Comece agora a organizar o conteúdo das suas mídias sociais 📑</Text>
			</Stack>
			<NewProject isFirstProduct />
		</Stack>
	)
}

export default FirstProject
