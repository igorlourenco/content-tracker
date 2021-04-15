import React from 'react'
import {
	Box, Link, Heading, Flex, Stack
} from '@chakra-ui/react'
import { IProject } from '../../interfaces/project'
import NewProject from '../project/new-project'
import { IoCalendarOutline } from 'react-icons/io5'
import { CgExternal } from 'react-icons/cg'
import UpdateProject from '../project/update-project'

interface ProjectsBoardProps {
	projects: IProject[]
}

const ProjectsBoard = ({ projects }: ProjectsBoardProps) => {
	return (
		<Stack spacing={8} width={['90vw', '80vw', '60vw']} shadow="lg" borderRadius="2xl" padding={5}>
			<Flex justifyContent="space-between">
				<Heading size="lg">Meus projetos</Heading>
				<NewProject />
			</Flex>

			{
				projects.map(project => (
					<Flex key={project._id} alignItems="center" justifyContent="space-between">
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
						<UpdateProject project={project} />
					</Flex>
				))
			}
		</Stack >
	)
}

export default ProjectsBoard
