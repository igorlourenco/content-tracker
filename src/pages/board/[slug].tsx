import React, { useState } from 'react'
import { Stack } from '@chakra-ui/react'
import CalendarHeader from '../../components/calendar/header'
import DaysOfWeek from '../../components/calendar/days-of-week'
import Days from '../../components/calendar/days'
import { GetStaticPaths, GetStaticProps } from 'next'
import connectToDatabase from '../../services/database/connect'
import { IProject } from '../../interfaces/project'
import Authenticated from '../../components/auth/authenticated'

interface BoardProps {
	project: IProject
}

const Board = ({ project }: BoardProps) => {
	const [currentDate, setCurrentDate] = useState(new Date())

	return (
		<Authenticated>
			<Stack paddingY={8} paddingX={5}>
				<CalendarHeader currentDate={currentDate} setCurrentDate={setCurrentDate} />
				<DaysOfWeek currentDate={currentDate} />
				<Days currentDate={currentDate} projectSlug={project?.slug} />
			</Stack>
		</Authenticated>
	)
}

export const getStaticPaths: GetStaticPaths = async () => {
	const db = await connectToDatabase()
	const collection = db.collection('projects')

	const projects = await collection.find({}).sort({ sentAt: -1 }).limit(20).toArray()

	const paths = projects.map((project) => ({
		params: { slug: project?.slug }
	}))

	return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps = async (context) => {
	const db = await connectToDatabase()
	const collection = db.collection('projects')

	const project = await collection.findOne({ slug: context?.params?.slug.toString() })

	project._id = project._id.toString()

	return {
		props: {
			project
		},
		revalidate: 1
	}
}

export default Board
