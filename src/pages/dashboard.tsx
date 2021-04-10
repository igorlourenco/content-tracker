import React, { useState } from 'react'
import { Stack } from '@chakra-ui/react'
import CalendarHeader from '../components/calendar/header'
import DaysOfWeek from '../components/calendar/days-of-week'
import Days from '../components/calendar/days'

const Calendar = () => {
	const [currentDate, setCurrentDate] = useState(new Date())

	return (
		<Stack paddingY={8} paddingX={5}>
			<CalendarHeader currentDate={currentDate} setCurrentDate={setCurrentDate} />
			<DaysOfWeek currentDate={currentDate} />
			<Days currentDate={currentDate} />
		</Stack>
	)
}

export default Calendar
