import React, { useState } from 'react'
import {
	IconButton,
	Box,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
	IconButtonProps
} from '@chakra-ui/react'
import { AiOutlineDelete } from 'react-icons/ai'
import { Button } from '../custom'

interface DeleteContentNoteProps extends IconButtonProps {
	id: string
}

const DeleteContentNote = ({ id }: DeleteContentNoteProps) => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [isLoading, setIsLoading] = useState(false)
	const deleteContentNote = async () => {
		setIsLoading(true)
		await fetch(`/api/content-note/delete/${id}`, {
			method: 'DELETE'
		})
		setIsLoading(false)
		onClose()
	}

	return (
		<>
			<IconButton
				variant="ghost"
				colorScheme="red"
				borderRadius="2xl"
				aria-label="Deletar Nota de Conteúdo"
				icon={<Box color="red.800" as={AiOutlineDelete} />}
				onClick={onOpen} />
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Calma aí!</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						Você tem certeza que deseja deletar essa anotação?
					</ModalBody>

					<ModalFooter>
						<Button colorScheme="purple" variant="ghost" onClick={onClose}>
							Fechar
						</Button>
						<Button isLoading={isLoading} variant="outline" colorScheme="red" onClick={deleteContentNote}>
							Sim, quero apagar
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}

export default DeleteContentNote
