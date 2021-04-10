import React from 'react'
import { Text, Box, Stack, Flex } from '@chakra-ui/react'
import { isToday, isSameMonth, isPast } from 'date-fns'
import NewContentNote from '../content-note/new-content-note'
import ContentNote from '../content-note/content-note'
import useSWR from 'swr'
import fetcher from '../../utils/fetcher'

interface DayProps {
	day: Date
	month: Date
	date: string
}

const Day = ({ day, month, date }: DayProps) => {
	const { data } = useSWR(['/api/content-note', day.toISOString()], fetcher, { refreshInterval: 1000 })

	const dayColor = (): any => {
		if (isSameMonth(day, month)) {
			return isPast(day) ? 'gray.500' : 'black'
		} else {
			return 'gray.400'
		}
	}

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
				<Text color={dayColor} fontWeight={isToday(day) ? '700' : '500'}>
					{date}
				</Text>
				<NewContentNote day={day} />
			</Flex>

			<Stack paddingBottom={2}>
				{data && data.contentNotes?.map((contentNote, index) => (
					<ContentNote key={index} {...contentNote} />
				))}
			</Stack>

		</Box >
	)
}

export default Day
