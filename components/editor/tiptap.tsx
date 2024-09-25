'use client'

import { useEditor, EditorContent, Extension } from '@tiptap/react'

import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import TextAlign from '@tiptap/extension-text-align'
import Highlight from '@tiptap/extension-highlight'
import BulletList from '@tiptap/extension-bullet-list'
import { EditorProvider, useCurrentEditor} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React from 'react'
import { faUser, faBold, faItalic, faHighlighter, faAlignLeft, faAlignCenter, faAlignRight, faAlignJustify } from '@fortawesome/free-solid-svg-icons';
import { 
  BeakerIcon, BoldIcon, ItalicIcon, 
  StrikethroughIcon, CodeBracketIcon, XCircleIcon, 
  TrashIcon, DocumentTextIcon, H1Icon, H2Icon, H3Icon,
  ListBulletIcon, CodeBracketSquareIcon, CommandLineIcon,
  MinusIcon, ArrowTurnDownLeftIcon, ArrowLeftIcon, ArrowRightIcon
} from '@heroicons/react/24/outline'


import { Button } from '@nextui-org/button'
import ColorButton from './colorButtons/colorButton'
import { Tooltip } from '@nextui-org/tooltip'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export interface CustomExtensionOptions {
    awesomeness: number
  }

const MenuBar = () => {
  const { editor } = useCurrentEditor()

  if (!editor) {
    return null
  }

  return (
    <div className="control-group">
      <div className="button-group">
        <Tooltip content='Bold' className='bg-[#e4dddd]'>
        <Button onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleBold()
              .run()
          }
          className={editor.isActive('bold') ? 'is-active' : ''} >
          <BoldIcon className="h-4 w-4"></BoldIcon>
        </Button>
        </Tooltip>
        
        
        <Button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleItalic()
              .run()
          }
          className={editor.isActive('italic') ? 'is-active' : ''}
        >
          <ItalicIcon className="h-4 w-4"></ItalicIcon>
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleStrike()
              .run()
          }
          className={editor.isActive('strike') ? 'is-active' : ''}
        >
          <StrikethroughIcon className="h-4 w-4"></StrikethroughIcon>
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleCode()
              .run()
          }
          className={editor.isActive('code') ? 'is-active' : ''}
        >
          <CodeBracketIcon className="h-4 w-4"></CodeBracketIcon>
        </Button>
        <Button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
          <XCircleIcon className='h-4 w-4'></XCircleIcon>  
        </Button>
        <Button onClick={() => editor.chain().focus().clearNodes().run()}>
          <TrashIcon className='h-4 w-4'></TrashIcon>
        </Button>
        <Button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editor.isActive('paragraph') ? 'is-active' : ''}
        >
          <DocumentTextIcon className="h-4 w-4"></DocumentTextIcon>
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
        >
          <H1Icon className="h-4 w-4"></H1Icon>
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
        >
          <H2Icon className="h-4 w-4"></H2Icon>
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
        >
          <H3Icon className="h-4 w-4"></H3Icon>
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'is-active' : ''}
        >
          <ListBulletIcon className="h-4 w-4"></ListBulletIcon>
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive('codeBlock') ? 'is-active' : ''}
        >
          <CodeBracketSquareIcon className="h-4 w-4"></CodeBracketSquareIcon>
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive('blockquote') ? 'is-active' : ''}
        >
          <CommandLineIcon className="h-4 w-4"></CommandLineIcon>
        </Button>
        <Button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
          <MinusIcon className="h-4 w-4"></MinusIcon>
        </Button>
        <Button onClick={() => editor.chain().focus().setHardBreak().run()}>
          <ArrowTurnDownLeftIcon className="h-4 w-4"></ArrowTurnDownLeftIcon>
        </Button>
        <Button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .undo()
              .run()
          }
        >
          <ArrowLeftIcon className="h-4 w-4"></ArrowLeftIcon>
        </Button>
        <Button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .redo()
              .run()
          }
        >
          <ArrowRightIcon className="h-4 w-4"></ArrowRightIcon>
        </Button>

        <Button onClick={() => 
          editor.chain().focus().toggleHighlight().run()} className={editor.isActive('highlight') ? 'is-active' : ''}>
          <FontAwesomeIcon icon={faHighlighter}></FontAwesomeIcon>
        </Button>
        <Button onClick={() => editor.chain().focus().setTextAlign('left').run()} className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}>
          <FontAwesomeIcon icon={faAlignLeft}></FontAwesomeIcon>
        </Button>
        <Button onClick={() => editor.chain().focus().setTextAlign('center').run()} className={editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}>
        <FontAwesomeIcon icon={faAlignCenter}></FontAwesomeIcon>
        </Button>
        <Button onClick={() => editor.chain().focus().setTextAlign('right').run()} className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}>
        <FontAwesomeIcon icon={faAlignRight}></FontAwesomeIcon>
        </Button>
        <Button onClick={() => editor.chain().focus().setTextAlign('justify').run()} className={editor.isActive({ textAlign: 'justify' }) ? 'is-active' : ''}>
        <FontAwesomeIcon icon={faAlignJustify}></FontAwesomeIcon>
        </Button>

        <ColorButton></ColorButton>
      </div>
    </div>
  )
}

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  ListItem,
  TextStyle,
  TextAlign.configure({
    types: ['heading', 'paragraph'],
    defaultAlignment: 'justify'
  }),
  Highlight,
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
]

const content = `
<h2>
  Hi there,
</h2>
<p>
  this is a <em>basic</em> example of <strong>Tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
</p>
<ul>
  <li>
    That’s a bullet list with one …
  </li>
  <li>
    … or two list items.
  </li>
</ul>
<p>
  Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
</p>
<pre><code class="language-css">body {
  display: none;
}</code></pre>
<p>
  I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
</p>
<blockquote>
  Wow, that’s amazing. Good work, boy! 👏
  <br />
  — Mom
</blockquote>
`

export default function Tiptap() {
  return (
    <EditorProvider slotBefore={<MenuBar />} extensions={extensions} content={content}></EditorProvider>
  )
}

