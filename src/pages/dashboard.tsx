import React from 'react'
import { Box, Stack } from '@chakra-ui/react'
import Authenticated from '../components/auth/authenticated'
import useSWR from 'swr'
import ProjectsBoard from '../components/dashboard/projects-board'
import FirstProject from '../components/dashboard/first-project'

const Dashboard = () => {
	const { data } = useSWR('/api/project')

	if (!data) return <h1>carregando</h1>

	return (
		<Authenticated>
			<Box width="100vw" minHeight="100vh" paddingY={12} display="flex" justifyContent="center" alignItems="center">
				<Stack spacing={8} width="60vw" shadow="lg" borderRadius="2xl" padding={5}>
					{data.projects && data.projects.length && data.projects.length > 1
						? <ProjectsBoard projects={data.projects} />
						: <FirstProject />}
				</Stack>
			</Box>
		</Authenticated>
	)
}

export default Dashboard
