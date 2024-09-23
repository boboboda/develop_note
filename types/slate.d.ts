import { BaseEditor } from 'slate'
import { ReactEditor } from 'slate-react'
import { HistoryEditor } from 'slate-history'

export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor

export type ParagraphElement = {
  type: 'paragraph'
  children: CustomText[]
}

export type HeadingElement = {
  type: 'heading'
  level: number
  children: CustomText[]
}

export type CodeElement ={
  type: 'code'
  language:'string' | 'javascript' | 'typescript' | 'html' | 'css' | 'json' | 'bash' | 'python' | 'java' | 'c++' | 'cpp' | 'csharp' | 'objectivec' | 'ruby' | 'go' | 'perl'
  value:'string'
}

export type CustomElement = ParagraphElement | HeadingElement | CodeElement

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