import React from 'react'
import { Box, Flex, Stack } from '@chakra-ui/react'
import Authenticated from '../components/auth/authenticated'
import useSWR from 'swr'
import ProjectsBoard from '../components/dashboard/projects-board'
import FirstProject from '../components/dashboard/first-project'
import Loading from '../components/loading'

const Dashboard = () => {
	const { data } = useSWR('/api/project', {
		refreshInterval: 100
	})

	if (!data) return <Loading />

	return (
		<Authenticated>
			<Box width="100vw" minHeight="100vh" paddingY={12} display="flex" justifyContent="center" alignItems="center">

				{data.projects && data.projects.length && data.projects.length >= 1
					? (
						<Flex justifyContent="space-between">
							<>
								<ProjectsBoard projects={data.projects} />
							</>
							<>
								<ProjectsBoard projects={data.projects} />
							</>
						</Flex>
					)
					: <FirstProject />}

			</Box>
		</Authenticated>
	)
}

export default Dashboard
