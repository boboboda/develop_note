import { Descendant, BaseEditor, BaseRange, Range, Element } from 'slate'
import { ReactEditor } from 'slate-react'
import { HistoryEditor } from 'slate-history'

export type BlockQuoteElement = {
  type: 'block-quote'
  align?: string
  children: Descendant[]
}

export type BulletedListElement = {
  type: 'bulleted-list'
  align?: string
  children: Descendant[]
}

export type CheckListItemElement = {
  type: 'check-list-item'
  checked: boolean
  align?: string
  children: Descendant[]
}

export type EditableVoidElement = {
  type: 'editable-void'
  align?: string
  children: EmptyText[]
}

export type HeadingElement = {
  type: 'heading'
  align?: string
  children: Descendant[]
}

export type HeadingTwoElement = {
  type: 'heading-two'
  align?: string
  children: Descendant[]
}

export type HeadingOneElement = {
  type: 'heading-one'
  align?: string
  children: Descendant[]
}



export type ImageElement = {
  type: 'image'
  url: string
  align?: string
  children: EmptyText[]
}

export type LinkElement = { type: 'link'; url: string; children: Descendant[]; align?: string}

export type ButtonElement = { type: 'button'; children: Descendant[]; align?: string }

export type BadgeElement = { type: 'badge'; children: Descendant[]; align?: string }

export type ListItemElement = { type: 'list-item'; children: Descendant[]; align?: string }

export type NubmerListElement = { type: 'numbered-list'; children: Descendant[]; align?: string }



export type MentionElement = {
  type: 'mention'
  character: string
  align?: string
  children: CustomText[]
}

export type ParagraphElement = {
  type: 'paragraph'
  align?: string
  children: Descendant[]
}

export type TableElement = { type: 'table'; children: TableRow[]; align?: string}

export type TableCellElement = { type: 'table-cell'; children: CustomText[]; align?: string }

export type TableRowElement = { type: 'table-row'; children: TableCell[]; align?: string }

export type TitleElement = { type: 'title'; children: Descendant[]; align?: string }

export type VideoElement = { type: 'video'; url: string; children: EmptyText[]; align?: string }



export type CodeBlockElement = {
  type: 'code-block'
  language: string
  children: Descendant[]
  align?: string
}

export type CodeLineElement = {
  type: 'code-line'
  children: Descendant[]
  align?: string
}

type CustomElement =
  | BlockQuoteElement
  | BulletedListElement
  | CheckListItemElement
  | EditableVoidElement
  | HeadingElement
  | HeadingTwoElement
  | ImageElement
  | LinkElement
  | ButtonElement
  | BadgeElement
  | ListItemElement
  | MentionElement
  | ParagraphElement
  | TableElement
  | TableRowElement
  | TableCellElement
  | TitleElement
  | VideoElement
  | CodeBlockElement
  | CodeLineElement
  | HeadingOneElement
  | NubmerListElement

export type CustomText = {
  bold?: boolean
  italic?: boolean
  code?: boolean
  text: string
  fontSize?: number
  underline?: boolean
}

export type EmptyText = {
  text: string
}

export type CustomEditor = BaseEditor &
  ReactEditor &
  HistoryEditor & {
    nodeToDecorations?: Map<Element, Range[]>
  }

declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor
    Element: CustomElement
    Text: CustomText | EmptyText
    Range: BaseRange & {
      [key: string]: unknown
    }
  }
}