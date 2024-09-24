"use client"
import React, { useCallback, useMemo } from 'react'
import isHotkey from 'is-hotkey'
import { Editable, withReact, useSlate, Slate, RenderElementProps, RenderLeafProps } from 'slate-react'
import {
  Editor,
  Transforms,
  createEditor,
  Descendant,
  Element as SlateElement,
} from 'slate'
import { withHistory } from 'slate-history'

import { Button, Icon, Toolbar } from '../componets'
import { CustomEditor, CustomElement, CustomText, EmptyText } from '@/types/slate'
import IconComponent from '../emotionTest'


interface HotkeyMap {
  [key: string]: string;
}

const HOTKEYS: HotkeyMap = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
}


const LIST_TYPES = ['numbered-list', 'bulleted-list']
const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify']

const RichTextExample = () => {
  const renderElement = useCallback((props: RenderElementProps) => <Element {...props} />, [])
  const renderLeaf = useCallback((props: RenderLeafProps) => <Leaf {...props} />, [])
  const editor = useMemo(() => withHistory(withReact(createEditor())), [])

  return (
    <Slate editor={editor} initialValue={initialValue}>
      <IconComponent/>
      <Toolbar>
        <MarkButton format="bold" icon="format_bold" />
        <MarkButton format="italic" icon="format_italic" />
        <MarkButton format="underline" icon="format_underlined" />
        <MarkButton format="code" icon="code" />
        <BlockButton format="heading-one" icon="looks_one" />
        <BlockButton format="heading-two" icon="looks_two" />
        <BlockButton format="block-quote" icon="format_quote" />
        <BlockButton format="numbered-list" icon="format_list_numbered" />
        <BlockButton format="bulleted-list" icon="format_list_bulleted" />
        <BlockButton format="left" icon="format_align_left" />
        <BlockButton format="center" icon="format_align_center" />
        <BlockButton format="right" icon="format_align_right" />
        <BlockButton format="justify" icon="format_align_justify" />
      </Toolbar>
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder="Enter some rich text…"
        spellCheck
        autoFocus
        onKeyDown={event => {
          for (const hotkey in HOTKEYS) {
            if (isHotkey(hotkey, event as any)) {
              event.preventDefault()
              const mark = HOTKEYS[hotkey]
              toggleMark(editor, mark)
            }
          }
        }}
      />
    </Slate>
  )
}

const toggleBlock = (editor: CustomEditor, format: any) => {
  const isActive = isBlockActive(
    editor,
    format,
    TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type'
  )
  const isList = LIST_TYPES.includes(format)

  Transforms.unwrapNodes(editor, {
    match: n =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes(n.type) &&
      !TEXT_ALIGN_TYPES.includes(format),
    split: true,
  })
  let newProperties: Partial<SlateElement>
  if (TEXT_ALIGN_TYPES.includes(format)) {
    newProperties = {
      align: isActive ? undefined : format,
    }
  } else {
    newProperties = {
      type : isActive ? 'paragraph' : isList ? 'list-item' : format,
    }
  }
  Transforms.setNodes<SlateElement>(editor, newProperties)

  if (!isActive && isList) {
    const block = { type: format, children: [] }
    Transforms.wrapNodes(editor, block)
  }
}

const toggleMark = (editor : CustomEditor, format : string) => {
  const isActive = isMarkActive(editor, format)

  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }
}

const isBlockActive = (editor: CustomEditor, format: string, blockType = 'type') => {
  const { selection } = editor
  if (!selection) return false

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: n =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        (n as Record<string, unknown>)?.[blockType] === format,
    })
  )

  return !!match
}

const isMarkActive = (editor : CustomEditor, format : string) => {
  const marks = Editor.marks(editor) as Partial<Record<string, boolean>>
  return marks ? marks[format] === true : false
}

const Element: React.FC<RenderElementProps> = (props) => {
  const style = props.element.align ? { textAlign: props.element.align as React.CSSProperties['textAlign'] } : {};
  switch (props.element.type) {
    case 'block-quote':
      return (
        <blockquote style={style} {...props.attributes}>
          {props.children}
        </blockquote>
      )
    case 'bulleted-list':
      return (
        <ul style={style} {...props.attributes}>
          {props.children}
        </ul>
      )
    case 'heading-one':
      return (
        <h1 style={style} {...props.attributes}>
          {props.children}
        </h1>
      )
    case 'heading-two':
      return (
        <h2 style={style} {...props.attributes}>
          {props.children}
        </h2>
      )
    case 'list-item':
      return (
        <li style={style} {...props.attributes}>
          {props.children}
        </li>
      )
    case 'numbered-list':
      return (
        <ol style={style} {...props.attributes}>
          {props.children}
        </ol>
      )
    default:
      return (
        <p style={style} {...props.attributes}>
          {props.children}
        </p>
      )
  }
}

function isCustomText(leaf: CustomText | EmptyText): leaf is CustomText {
  return 'bold' in leaf || 'italic' in leaf || 'code' in leaf || 'underline' in leaf;
}

const Leaf: React.FC<RenderLeafProps> = ({ attributes, children, leaf }) => {

  

  if (isCustomText(leaf)) {
    if (leaf.bold) {
      children = <strong>{children}</strong>
    }

    if (leaf.code) {
      children = <code>{children}</code>
    }

    if (leaf.italic) {
      children = <em>{children}</em>
    }

    if (leaf.underline) {
      children = <u>{children}</u>
    }
  }

  return <span {...attributes}>{children}</span>
}

const BlockButton = ( {format, icon}:{format: string, icon: string}) => {
  const editor = useSlate()
  return (
    <Button
      active={isBlockActive(
        editor,
        format,
        TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type'
      )}
      onMouseDown={(event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        event.preventDefault()
        toggleBlock(editor, format)
      }}
    >
      <Icon className="material-icons">{icon}</Icon>
    </Button>
  )
}

const MarkButton = ( {format, icon}:{format: string, icon: string}) => {
  const editor = useSlate()
  return (
    <Button
      active={isMarkActive(editor, format)}
      onMouseDown={(event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        event.preventDefault()
        toggleMark(editor, format)
      }}
    >
      <Icon>{icon}</Icon>
    </Button>
  )
}

const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [
      { text: 'This is editable ' },
      { text: 'rich', bold: true },
      { text: ' text, ' },
      { text: 'much', italic: true },
      { text: ' better than a ' },
      { text: '<textarea>', code: true },
      { text: '!' },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text: "Since it's rich text, you can do things like turn a selection of text ",
      },
      { text: 'bold', bold: true },
      {
        text: ', or add a semantically rendered block quote in the middle of the page, like this:',
      },
    ],
  },
  {
    type: 'block-quote',
    children: [{ text: 'A wise quote.' }],
  },
  {
    type: 'paragraph',
    align: 'center',
    children: [{ text: 'Try it out for yourself!' }],
  },
]

export default RichTextExample