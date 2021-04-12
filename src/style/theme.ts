import { extendTheme } from '@chakra-ui/react'

const fonts = {
	heading: '\'Montserrat\', sans-serif',
	body: '\'Montserrat\', sans-serif',
	mono: '\'Menlo\', monospace'
}

const styles = {
	global: {
		'html, body': {
			color: 'gray.800',
			lineHeight: 'tall'
		},
		input: {
			color: 'gray.700',
			fontWeight: 600
		}
	}
}

const theme = extendTheme({ fonts, styles })

export default theme
