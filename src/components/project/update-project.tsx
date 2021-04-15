import React, { useState } from 'react'
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Box, useDisclosure,
	IconButton,
	Stack,
	Text
} from '@chakra-ui/react'
import { Button, Input } from '../custom'
import { IProject } from '../../interfaces/project'
import { HiOutlineDotsVertical } from 'react-icons/hi'

interface UpdateProjectProps {
	project: IProject
}

const UpdateProject = ({ project }: UpdateProjectProps) => {
	const [name, setName] = useState(project.name)
	const [slug, setSlug] = useState(project.slug)
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [isLoading, setIsLoading] = useState(false)

	const formatSlug = (slug: string) => {
		const sentence = slug.replaceAll(' ', '-')
		return sentence.toLowerCase()
	}

	const changeName = (event) => setName(event.target.value)
	const changeSlug = (event) => setSlug(formatSlug(event.target.value))

	const updateProject = async () => {
		setIsLoading(true)

		await fetch(`/api/project/update/${project._id}`, {
			method: 'PUT',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ name, slug })
		})

		setIsLoading(false)
		onClose()
	}

	return (
		<>
			<IconButton onClick={onOpen} variant="ghost" backgroundColor="transparent" aria-label="Actions" icon={<Box as={HiOutlineDotsVertical} />} />

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent borderRadius="2xl">
					<ModalHeader>{name}</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Stack spacing={5}>
							<Stack>
								<Text fontWeight={600} fontSize={14}>Nome do projeto</Text>
								<Input
									placeholder="Nome do projeto"
									type="text"
									value={name}
									onChange={changeName}
								/>
							</Stack>
							<Stack>
								<Text fontWeight={600} fontSize={14}>Endereço de Link</Text>
								<Input
									placeholder="Endereço de link"
									type="text"
									value={slug}
									onChange={changeSlug}
								/>
								<Text fontSize={10}>http://mysociall.com/{slug}</Text>
							</Stack>
						</Stack>

					</ModalBody>

					<ModalFooter>
						<Button variant="ghost" colorScheme="gray" mr={3} onClick={onClose}>
							Cancelar
						</Button>
						<Button isLoading={isLoading} variant="solid" colorScheme="purple" onClick={updateProject}>
							Alterar
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}

export default UpdateProject
