import React from 'react'
import { Flex, IconButton, Heading, Box } from '@chakra-ui/react'
import { addMonths, subMonths } from 'date-fns'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'
import { capitalize, formatDate } from '../../utils/helpers'

interface CalendarHeaderProps {
	currentDate: Date
	setCurrentDate: (setCurrentDateFunction: any) => void
}
const CalendarHeader = ({ currentDate, setCurrentDate }: CalendarHeaderProps) => {
	const dateFormat = 'MMMM yyyy'

	console.log(currentDate)

	const previousMonth = () => {
		setCurrentDate(subMonths(currentDate, 1))
	}

	const nextMonth = () => {
		setCurrentDate(addMonths(currentDate, 1))
	}

	return (
		<Flex alignItems="center" justifyContent="space-between">
			<IconButton
				aria-label="Voltar ao mês anterior"
				icon={<Box color="teal.800" as={AiOutlineArrowLeft} />}
				variant="ghost"
				colorScheme="teal"
				onClick={previousMonth} />

			<Heading color="teal.800">{capitalize(formatDate(currentDate, dateFormat))}</Heading>

			<IconButton
				aria-label="Ir para o próximo mês"
				icon={<Box color="teal.800" as={AiOutlineArrowRight} />}
				variant="ghost"
				colorScheme="teal"
				onClick={nextMonth} />
		</Flex>
	)
}

export default CalendarHeader
