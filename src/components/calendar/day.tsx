import React from 'react'
import { Text, Box, Stack, Flex, BoxProps } from '@chakra-ui/react'
import { isToday, isSameMonth, isPast } from 'date-fns'
import NewContentNote from '../content-note/new-content-note'
import ContentNote from '../content-note/content-note'
import IContentNote from '../../interfaces/content-note'
import { formatDate } from '../../utils/helpers'

interface DayProps extends BoxProps {
	day: Date
	month: Date
	date: string
	project: string
	contentNotes: IContentNote[]
}

const Day = ({ day, month, date, project, contentNotes, ...props }: DayProps) => {
	return (
		<Box
			id={`day-${formatDate(day, 'T')}`}
			padding={2}
			width="100%"
			height="200px"
			borderRadius="2xl"
			shadow={isToday(day) ? 'md' : 'sm'}
			_hover={{ shadow: 'md' }}
			overflowY="scroll"
			backgroundColor={isToday(day) ? 'purple.100' : 'white'}
			{...props}
		>
			<Flex alignItems="center" justifyContent="space-between" marginBottom={2}>
				<Text color={isSameMonth(day, month) ? 'black' : 'gray.400'} fontWeight={isToday(day) ? '700' : '500'}>
					{date}
				</Text>
				{(!isPast(day) || isToday(day)) && <NewContentNote project={project} day={day} />}
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
