import React, { useState } from 'react'
import { generateId } from '../../utils/helpers'
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Box, useDisclosure
} from '@chakra-ui/react'
import { AiOutlinePlus } from 'react-icons/ai'
import { Button, Input } from '../custom'
import { mutate } from 'swr'

interface NewProjectProps {
	isFirstProduct?: boolean
}

const NewProject = ({ isFirstProduct = false }: NewProjectProps) => {
	const [name, setName] = useState('')
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [isLoading, setIsLoading] = useState(false)

	const newProject = async () => {
		setIsLoading(true)
		const unformattedSlug = name + ' ' + generateId(6)
		const removeSpaces = unformattedSlug.replaceAll(' ', '-')
		const slug = removeSpaces.toLowerCase()

		await fetch('/api/project', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ name, slug, createdAt: new Date().toISOString() })
		})

		mutate(
			'/api/project',
			async (data: any) => {
				return { projects: [{ name, slug }, ...data.projects] }
			},
			false
		)

		setIsLoading(false)
		setName('')
		onClose()
	}

	return (
		<>
			<Button
				borderRadius="2xl"
				variant={isFirstProduct ? 'solid' : 'outline'}
				colorScheme="purple"
				boxShadow="md"
				leftIcon={<Box as={AiOutlinePlus} />}
				onClick={onOpen}
			>
				{isFirstProduct ? 'Crie seu primeiro projeto' : 'Criar projeto'}
			</Button>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent borderRadius="2xl">
					<ModalHeader>Novo projeto</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Input
							placeholder="Nome do projeto"
							type="text"
							value={name}
							onChange={(event) => setName(event.target.value)}
						/>

					</ModalBody>

					<ModalFooter>
						<Button variant="ghost" colorScheme="gray" mr={3} onClick={onClose}>
							Cancelar
						</Button>
						<Button isLoading={isLoading} variant="solid" colorScheme="purple" onClick={newProject}>
							Criar projeto
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}

export default NewProject
