'use client'

import { useEditor } from '@tiptap/react'
import type { AnyExtension, Editor } from '@tiptap/core'
import { ExtensionKit } from '@/extensions/extension-kit'
import { initialContent } from '@/lib/data/initialContent'

declare global {
  interface Window {
    editor: Editor | null
  }
}

export const useBlockEditor = () => {
  // 에디터를 초기화하는 훅
  const editor = useEditor({
    immediatelyRender: true, // 즉시 렌더링 여부
    shouldRerenderOnTransaction: false, // 트랜잭션마다 재렌더링 여부
    autofocus: true, // 자동 포커스
    onCreate: ctx => {
      // 에디터가 비어있는지 확인 후, 초기 콘텐츠 설정
      if (ctx.editor.isEmpty) {
        ctx.editor.commands.setContent(initialContent)
        ctx.editor.commands.focus('start', { scrollIntoView: true })
      }
    },
    extensions: [
      ...ExtensionKit({}),
    ].filter((e): e is AnyExtension => e !== undefined), // 확장 설정
    editorProps: {
      attributes: {
        autocomplete: 'off',
        autocorrect: 'off',
        autocapitalize: 'off',
        class: 'min-h-full', // CSS 클래스 설정
      },
    },
  })

  // 에디터 객체를 전역 window 객체에 저장하여 개발 중에도 접근 가능하게 만듦
  window.editor = editor

  // 에디터 반환
  return { editor }
}
