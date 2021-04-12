import React from 'react'
import { Box, Link, Heading, Flex } from '@chakra-ui/react'
import { IProject } from '../../interfaces/project'
import NewProject from '../project/new-project'
import { IoCalendarOutline } from 'react-icons/io5'
import { CgExternal } from 'react-icons/cg'

interface ProjectsBoardProps {
	projects: IProject[]
}

const ProjectsBoard = ({ projects }: ProjectsBoardProps) => {
	return (
		<>
			<Flex justifyContent="space-between">
				<Heading size="lg">Meus projetos</Heading>
				<NewProject />
			</Flex>

			{projects.map(project => (
				<Flex key={project._id}>
					<Flex gridColumnGap={3}>
						<Box size={24} color="purple.700" as={IoCalendarOutline} />
						<Link
							isExternal
							href={`/board/${project.slug}`}
							fontWeight="600" color="gray.700"
						>
							<Flex alignItems="center">
								{project.name} <Box size={16} color="gray.700" as={CgExternal} />
							</Flex>
						</Link>
					</Flex>
				</Flex>
			))}
		</>
	)
}

export default ProjectsBoard
