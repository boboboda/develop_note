'use client'

import { useEditor, EditorContent, Extension, ReactNodeViewRenderer, BubbleMenu } from '@tiptap/react'

import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import TextAlign from '@tiptap/extension-text-align'
import Highlight from '@tiptap/extension-highlight'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { EditorProvider, useCurrentEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import React, { useEffect, useRef } from 'react'
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
import { all, createLowlight } from 'lowlight'
import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
import CodeBlockComponent from './codeBlockComponet'
import ImgButton from './imgButton'
import ImageBlockMenu from './image/imageBlockMenu'

export interface CustomExtensionOptions {
  awesomeness: number
}

const lowlight = createLowlight(all)

  lowlight.register('html', html)
  lowlight.register('css', css)
  lowlight.register('js', js)
  lowlight.register('ts', ts)

const MenuBar = () => {
  const { editor } = useCurrentEditor()

  const menuContainerRef = useRef(null)

  if (!editor) {
    return null
  }

  // useEffect(()=>{
  //   editor.setEditable(true)
  // }, [])

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
        <ImgButton></ImgButton>
        <ImageBlockMenu editor={editor} appendTo={menuContainerRef} />
      </div>
    </div>
  )
}

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  ListItem,
  TextStyle,

  CodeBlockLowlight.extend({
    addNodeView() {
      return ReactNodeViewRenderer(CodeBlockComponent)
    }
  }).configure({
    lowlight,
  }),
  TextAlign.configure({
    types: ['heading', 'paragraph'],
    defaultAlignment: 'justify'
  }),
  Highlight,
  Image,
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
  안녕 코린이들아
</h2>
<p>
  텍스트 에디터 구현하지마라 <em>개 빡시다</em> <strong>이게 먼짓인지</strong>. 알아야할거 댕많다
</p>
<ul>
  <li>
    자바스크립트, css, cass, scss, 타입스크립트, 리액트, ui컴포넌트, 등등 
  </li>
  <li>
    웹 개발은 먼가 불친절하다.
  </li>
</ul>
<p>
이게 코딩블럭이다. 이거 구현하는데도 하루 걸렸다.
</p>
<pre><code class="language-css">body {
  display: none;
}</code></pre>
<p>
  그냥 구현된 블로그 쓰자
</p>
<blockquote>
언제 다만들지..
  <br />
  — 추신 줫밥 코린이가
</blockquote>
`

export default function Tiptap() {
  return (
    <EditorProvider slotBefore={<MenuBar/>} extensions={extensions} content={content}></EditorProvider>
  )
}

