"use client"
import { CustomEditorType, CustomElement, CodeElementType } from "@/types/slate";
// Import React dependencies.
import { useState, useCallback, useMemo, useEffect, Children } from "react";
// Import the Slate editor factory.
import { collapse, createEditor, Node, NodeEntry, Operation, BaseEditor, Descendant, Transforms, Element, Editor } from 'slate'
import { ReactEditor, Slate, RenderElementProps, RenderLeafProps, useSlate } from 'slate-react'
import { ChromePicker } from 'react-color';

export const CustomEditor = {
 

    isCodeBlockActive(editor:CustomEditorType) {
      const [match] = Editor.nodes(editor, {
        match: n => n.type === 'code',
      })
  
      return !!match
    },
  
    toggleCodeBlock(editor: CustomEditorType) {
      const isActive = CustomEditor.isCodeBlockActive(editor)
      Transforms.setNodes(
        editor,
        { type: isActive ? null : 'code' },
        { match: n => Element.isElement(n) && Editor.isBlock(editor, n) }
      )
    },
  
    isMarkActive(editor: CustomEditorType, format: string) {
      const marks = Editor.marks(editor)
      return marks ? marks[format] === true : false
    },
  
    toggleMark(editor: CustomEditorType, format: string) {
      const isActive = this.isMarkActive(editor, format)
      if (isActive) {
        Editor.removeMark(editor, format)
      } else {
        Editor.addMark(editor, format, true)
      }
    },
  
    toggleBoldMark(editor: CustomEditorType) {
      this.toggleMark(editor, 'bold')
    },
  
    toggleItalicMark(editor: CustomEditorType) {
      this.toggleMark(editor, 'italic')
    },
  
    setFontSize(editor: CustomEditorType, size: string) {
      Editor.addMark(editor, 'fontSize', size)
    },
  
    setColor(editor: CustomEditorType, color: string) {
      Editor.addMark(editor, 'color', color)
    },
  
    setMark(editor: CustomEditorType, format: string, value: any) {
      Editor.addMark(editor, format, value)
    },
  
  }