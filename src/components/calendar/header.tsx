import React from 'react'
import { Flex, Heading } from '@chakra-ui/react'
import { addMonths, subMonths } from 'date-fns'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'
import { capitalize, formatDate } from '../../utils/helpers'
import { IconButton } from '../custom'

interface CalendarHeaderProps {
	currentDate: Date
	setCurrentDate: (setCurrentDateFunction: any) => void
}
const CalendarHeader = ({ currentDate, setCurrentDate }: CalendarHeaderProps) => {
	const dateFormat = 'MMMM yyyy'

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
				customIcon={AiOutlineArrowLeft}
				variant="ghost"
				onClick={previousMonth} />

			<Heading color="purple.800">{capitalize(formatDate(currentDate, dateFormat))}</Heading>

			<IconButton
				aria-label="Ir para o próximo mês"
				customIcon={AiOutlineArrowRight}
				variant="ghost"
				onClick={nextMonth} />
		</Flex>
	)
}

export default CalendarHeader
