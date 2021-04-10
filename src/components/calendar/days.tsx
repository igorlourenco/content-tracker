import React from 'react'
import { addDays, startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns'
import { Flex, Stack } from '@chakra-ui/react'
import Day from './day'
import { formatDate } from '../../utils/helpers'

interface DaysProps {
	currentDate: Date
}

const Days = ({ currentDate }: DaysProps) => {
	const monthStart = startOfMonth(currentDate)
	const monthEnd = endOfMonth(monthStart)
	const startDate = startOfWeek(monthStart)
	const endDate = endOfWeek(monthEnd)
	const dateFormat = 'd'
	const rows = []
	let days = []
	let day = startDate
	let formattedDate = ''
	let key = 0
	while (day <= endDate) {
		for (let i = 0; i < 7; i++) {
			formattedDate = formatDate(day, dateFormat)
			days.push(
				<Day key={i} day={day} month={monthStart} date={formattedDate} />
			)
			day = addDays(day, 1)
		}
		rows.push(
			<Flex
				width="100%"
				gridColumnGap={2}
				alignItems="center"
				key={`week-${key}`}
				justifyContent="space-between"
			>
				{days}
			</Flex>
		)

		key += 1
		days = []
	}
	return <Stack>{rows}</Stack>
}

export default Days
