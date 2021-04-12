import React, { useState } from 'react'
import {
	Stack,
	Flex,
	Text,
	Drawer,
	DrawerBody,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	RadioGroup,
	Radio,
	Divider,
	useDisclosure, Box
} from '@chakra-ui/react'
import { format } from 'date-fns'
import { Editor, EditorState, convertToRaw } from 'draft-js'
import { channels } from '../../api/channels'
import { AiOutlinePlus } from 'react-icons/ai'
import {
	onBlockStyle,
	onInlineStyle,
	handleKeyCommand,
	RICH_BLOCK_STYLES,
	RICH_INLINE_STYLES
} from '../../utils/draft-js'
import { Button, Input, IconButton } from '../custom'

interface NewContentNoteProps {
	day: Date
	project: string
}

const NewContentNote = ({ day, project }: NewContentNoteProps) => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [title, setTitle] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [editorState, setEditorState] = useState(EditorState.createEmpty())
	const [selectedChannel, setSelectedChannel] = useState('youtube')

	const onEditorChange = (editorState) => {
		setEditorState(editorState)
	}

	const saveContentNote = async () => {
		setIsLoading(true)
		const blocks = editorState.getCurrentContent()
		const notes = JSON.stringify(convertToRaw(blocks))

		await fetch('/api/content-note', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ title, channel: selectedChannel, notes, date: day.toISOString(), project })
		})

		setIsLoading(false)
		setTitle('')
		setEditorState(EditorState.createEmpty())
		setSelectedChannel('youtube')
		onClose()
	}

	return (
		<>
			<IconButton
				aria-label="Novo conteúdo"
				size="md"
				customIcon={AiOutlinePlus}
				variant="ghost"
				onClick={onOpen}
			/>
			<Drawer onClose={onClose} isOpen={isOpen} size="xl">
				<DrawerOverlay>
					<DrawerContent>
						<DrawerCloseButton />
						<DrawerHeader>Nota de Conteúdo</DrawerHeader>
						<DrawerBody>
							<Stack spacing={6}>
								<Box>
									<Text>Conteúdo para o dia {format(day, 'dd/MM/yyyy')}</Text>
								</Box>
								<Box>
									<Input
										placeholder="Título"
										type="text"
										value={title}
										onChange={(event) => setTitle(event.target.value)}
									/>
								</Box>
								<Box>
									<RadioGroup colorScheme="purple" value={selectedChannel}>
										<Flex gridColumnGap={5}>
											{channels.map(channel => (
												<Radio
													key={channel.id}
													onChange={() => setSelectedChannel(channel.id)}
													value={channel.id}
												>
													{channel.name}
												</Radio>
											))}
										</Flex>
									</RadioGroup>
								</Box>

								<Stack marginTop={4}>
									<Divider />
									<Flex gridColumnGap={3}>
										{RICH_INLINE_STYLES.map(style => (
											<IconButton
												variant="outline"
												colorScheme="gray"
												key={style.action}
												aria-label={style.label}
												customIcon={style.icon}
												onClick={() => onInlineStyle(onEditorChange, editorState, style.action)} />
										))}
										{RICH_BLOCK_STYLES.map(style => (
											<IconButton
												variant="outline"
												colorScheme="gray"
												key={style.action}
												aria-label={style.label}
												customIcon={style.icon}
												onClick={() => onBlockStyle(onEditorChange, editorState, style.action)} />
										))}
									</Flex>
									<Editor
										editorState={editorState}
										handleKeyCommand={(event) => handleKeyCommand(event.target, onEditorChange, editorState)}
										onChange={onEditorChange}
									/>
								</Stack>
							</Stack>
						</DrawerBody>
						<DrawerFooter>
							<Button variant="ghost" colorScheme="red" mr={3} onClick={onClose}>
								Cancelar
							</Button>
							<Button boxShadow="md" isLoading={isLoading} onClick={saveContentNote}>
								Salvar
							</Button>
						</DrawerFooter>
					</DrawerContent>
				</DrawerOverlay>
			</Drawer>
		</>
	)
}

export default NewContentNote
