import { BaseEditor } from 'slate'
import { ReactEditor } from 'slate-react'
import { HistoryEditor } from 'slate-history'

export type CustomEditorType = BaseEditor & ReactEditor & HistoryEditor

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

export type CustomText = {
  text: string
  bold?: boolean
  italic?: boolean
  underline?: boolean
  code?: boolean
  fontSize?: number
  color?: string
  [key: string]: any  // 추가 속성을 위한 인덱스 시그니처
}

declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditorType
    Element: CustomElement
    Text: CustomText
  }
}