import React from 'react'
import {
	Box,
	Input as ChakraInput, InputProps,
	IconButton as ChakraIconButton, IconButtonProps,
	Button as ChakraButton, ButtonProps
} from '@chakra-ui/react'

interface CustomIconButtonProps extends IconButtonProps {
	customIcon: any
}

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
	return <ChakraButton borderRadius="2xl" colorScheme="purple" {...props} />
}

export const IconButton = (props: CustomIconButtonProps) => {
	return <ChakraIconButton
		borderRadius="2xl"
		colorScheme="purple"
		icon={<Box color="purple.900" as={props.customIcon} />}
		{...props}
	/>
}
