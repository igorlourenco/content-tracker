import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export const formatDate = (date: Date, dateFormat: string) => {
	return format(date, dateFormat, { locale: ptBR })
}

export const capitalize = (word: string) => {
	return word.charAt(0).toUpperCase() + word.slice(1)
}
