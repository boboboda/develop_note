import { BaseEditor } from 'slate'
import { ReactEditor } from 'slate-react'
import { HistoryEditor } from 'slate-history'

export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor

export type ParagraphElementType = {
  type: 'paragraph'
  children: CustomText[]
}

export type HeadingElementType = {
  type: 'heading'
  level: number
  children: CustomText[]
}

export type CodeElementType ={
  type: 'code'
  language:|'javascript' | 'typescript' | 'html' | 'css' | 'json' | 'bash' | 'python' | 'java' | 'c++' | 'cpp' | 'csharp' | 'objectivec' | 'ruby' | 'go' | 'perl'
  children: CustomText[]
}

export type CustomElement = ParagraphElementType | HeadingElementType | CodeElementType

export type EditorType = BaseEditor & ReactEditor & HistoryEditor

export type FormattedText = { text: string; bold?: true }

export type CustomText = FormattedText

declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor
    Element: CustomElement
    Text: CustomText
  }
}