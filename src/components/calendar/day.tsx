import React from 'react'
import { Text, Box, Stack, Flex } from '@chakra-ui/react'
import { isToday, isSameMonth } from 'date-fns'
import NewContentNote from '../content-note/new-content-note'
import ContentNote from '../content-note/content-note'
import IContentNote from '../../interfaces/content-note'

interface DayProps {
	day: Date
	month: Date
	date: string
	project: string
	contentNotes: IContentNote[]
}

const Day = ({ day, month, date, project, contentNotes }: DayProps) => {
	return (
		<Box
			padding={1}
			width="100%"
			height="200px"
			borderRadius="md"
			shadow={isToday(day) ? 'md' : 'sm'}
			_hover={{ shadow: 'md' }}
			overflowY="scroll"
			backgroundColor={isToday(day) ? 'teal.50' : 'white'}>
			<Flex alignItems="center" justifyContent="space-between" marginBottom={2}>
				<Text color={isSameMonth(day, month) ? 'black' : 'gray.400'} fontWeight={isToday(day) ? '700' : '500'}>
					{date}
				</Text>
				<NewContentNote project={project} day={day} />
			</Flex>

			<Stack paddingBottom={2}>
				{contentNotes?.map((contentNote, index) => (
					<ContentNote key={index} {...contentNote} />
				))}
			</Stack>

		</Box >
	)
}

export default Day
