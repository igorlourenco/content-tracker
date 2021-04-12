import React from 'react'
import {
	Input as ChakraInput, InputProps,
	Button as ChakraButton, ButtonProps
} from '@chakra-ui/react'

export const Input = (props: InputProps) => {
	return <ChakraInput
		backgroundColor="purple.100"
		border="0"
		borderRadius="2xl"
		_focus={{
			borderColor: 'purple.600'
		}}
		{...props} />
}

export const Button = (props: ButtonProps) => {
	return <ChakraButton borderRadius="2xl" {...props} />
}
