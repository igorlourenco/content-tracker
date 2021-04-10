import { EditorState, RichUtils } from 'draft-js'
import {
	AiOutlineBold,
	AiOutlineItalic,
	AiOutlineUnderline,
	AiOutlineCode,
	AiOutlineStrikethrough,
	AiOutlineUnorderedList,
	AiOutlineOrderedList
} from 'react-icons/ai'

export const onInlineStyle = (onEditorChange: any, editorState: EditorState, style: string) => {
	onEditorChange(RichUtils.toggleInlineStyle(editorState, style))
}

export const onBlockStyle = (onEditorChange: any, editorState: EditorState, style: string) => {
	onEditorChange(RichUtils.toggleBlockType(editorState, style))
}

export const handleKeyCommand = (command, onEditorChange: any, editorState: EditorState) => {
	const newState = RichUtils.handleKeyCommand(editorState, command)
	if (newState) {
		onEditorChange(newState)
		return 'handled'
	}
	return 'not-handled'
}

export const onBoldClick = (onEditorChange: any, editorState: EditorState) => {
	onEditorChange(RichUtils.toggleInlineStyle(editorState, 'BOLD'))
}

export const onBulletedList = (onEditorChange: any, editorState: EditorState) => {
	onEditorChange(RichUtils.toggleBlockType(editorState, 'unordered-list-item'))
}

export const RICH_INLINE_STYLES = [
	{
		label: 'Bold',
		action: 'BOLD',
		icon: AiOutlineBold
	},
	{
		label: 'Italic',
		action: 'ITALIC',
		icon: AiOutlineItalic
	},
	{
		label: 'Underline',
		action: 'UNDERLINE',
		icon: AiOutlineUnderline
	},
	{
		label: 'STRIKETHROUGH',
		action: 'STRIKETHROUGH',
		icon: AiOutlineStrikethrough
	},
	{
		label: 'CODE',
		action: 'CODE',
		icon: AiOutlineCode
	}
]

export const RICH_BLOCK_STYLES = [
	{
		label: 'Unordered List Item',
		action: 'unordered-list-item',
		icon: AiOutlineUnorderedList
	},
	{
		label: 'Ordered List Item',
		action: 'ordered-list-item',
		icon: AiOutlineOrderedList
	}
]
