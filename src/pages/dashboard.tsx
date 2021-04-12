import React, { useState } from 'react'
import { Heading, Text, Link, Input, Button, Stack } from '@chakra-ui/react'
import { generateId } from '../utils/helpers'
import Authenticated from '../components/auth/authenticated'
import useSWR from 'swr'

const Dashboard = () => {
	const [name, setName] = useState('')
	const { data } = useSWR('/api/project')

	const newProject = async () => {
		const unformattedSlug = name + ' ' + generateId(6)
		const removeSpaces = unformattedSlug.replaceAll(' ', '-')
		const slug = removeSpaces.toLowerCase()

		await fetch('/api/project', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ name, slug })
		})
	}

	return (
		<Authenticated>
			<Stack>
				{data && data.projects && data.projects.map(project => (
					<Link isExternal key={project._id} href={`/board/${project.slug}`}>
						{project.name}
					</Link>
				))}
			</Stack>
			<Stack spacing={4}>
				<Heading>Seus projetos</Heading>
				<Stack>
					<Stack>
						<Text>Nome do projeto</Text>
						<Input value={name} onChange={(event) => setName(event.target.value)} type="text" />
					</Stack>
					<Button onClick={newProject}> novo projeto </Button>

				</Stack>
			</Stack>
		</Authenticated>
	)
}

export default Dashboard
