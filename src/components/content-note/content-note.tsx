import React, { useState } from 'react'
import {
	Input,
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
	Divider,
	IconButton,
	Radio,
	Button, useDisclosure, Box
} from '@chakra-ui/react'
import { Editor, EditorState, convertToRaw, convertFromRaw } from 'draft-js'
import { channels } from '../../api/channels'
import IContentNote from '../../interfaces/content-note'
import {
	onBlockStyle,
	onInlineStyle,
	handleKeyCommand,
	RICH_BLOCK_STYLES,
	RICH_INLINE_STYLES
} from '../../utils/draft-js'
import { formatDate } from '../../utils/helpers'
import DeleteContentNote from './delete-content-note'

const ContentNote = ({ _id, date, title, channel, notes }: IContentNote) => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [isLoading, setIsLoading] = useState(false)
	const content = convertFromRaw(JSON.parse(notes))
	const [editorState, setEditorState] = useState(EditorState.createWithContent(content))
	const [currentTitle, setCurrentTitle] = useState(title)
	const [selectedChannel, setSelectedChannel] = useState(channel)

	const noteChannel = channels.find(c => c.id === channel)

	const updateContentNote = async () => {
		setIsLoading(true)
		const blocks = editorState.getCurrentContent()
		const notes = JSON.stringify(convertToRaw(blocks))

		await fetch(`/api/content-note/update/${_id}`, {
			method: 'PUT',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ title: currentTitle, channel: selectedChannel, notes })
		})

		setIsLoading(false)
		onClose()
	}

	const onEditorChange = (editorState) => {
		setEditorState(editorState)
	}

	return (
		<>
			<Text
				_hover={{ shadow: 'md' }}
				onClick={onOpen}
				paddingX={2}
				borderRadius="sm"
				backgroundColor={noteChannel.backgroundColor}
				color={noteChannel.color}
				style={{
					cursor: 'pointer',
					width: '18ch',
					whiteSpace: 'nowrap',
					overflow: 'hidden',
					textOverflow: 'ellipsis'
				}}
			>
				{title}
			</Text>
			<Drawer onClose={onClose} isOpen={isOpen} size="xl">
				<DrawerOverlay>
					<DrawerContent>
						<DrawerCloseButton />
						<DrawerHeader>Nota de Conteúdo</DrawerHeader>
						<DrawerBody>
							<Stack spacing={4}>
								<Box>
									<Text>Conteúdo para o dia {formatDate(new Date(date), 'dd/MM/yyyy')}</Text>
								</Box>
								<Box>
									<Input
										value={currentTitle}
										onChange={(event) => setCurrentTitle(event.target.value)}
										backgroundColor="gray.100"
										placeholder="Título"
										type="text"
										fontWeight="600"
										border={0} />
								</Box>
								<Box>
									<RadioGroup colorScheme="teal" value={selectedChannel}>
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
												icon={<Box as={style.icon} />}
												onClick={() => onInlineStyle(onEditorChange, editorState, style.action)} />
										))}
										{RICH_BLOCK_STYLES.map(style => (
											<IconButton
												variant="outline"
												colorScheme="gray"
												key={style.action}
												aria-label={style.label}
												icon={<Box as={style.icon} />}
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
						<DrawerFooter justifyContent="space-between">

							<Stack>
								<DeleteContentNote
									aria-label="Deletar Nota de Conteúdo"
									id={_id}
									onClick={onClose} />
							</Stack>

							<Stack isInline>
								<Button variant="outline" mr={3} onClick={onClose}>
									Cancelar
								</Button>
								<Button isLoading={isLoading} colorScheme="teal" onClick={updateContentNote}>Salvar</Button>
							</Stack>

						</DrawerFooter>
					</DrawerContent>
				</DrawerOverlay>
			</Drawer>
		</>
	)
}

export default ContentNote
