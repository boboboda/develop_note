"use client"
import { EditorType, CustomElement, CodeElementType } from "@/types/slate";
// Import React dependencies.
import { useState, useCallback, useMemo, useEffect } from "react";
// Import the Slate editor factory.
import { collapse, createEditor, Node, NodeEntry, Operation, } from 'slate'
import { BaseEditor, Descendant, Transforms, Element, Editor } from 'slate'
import { ReactEditor, Slate, RenderElementProps, RenderLeafProps, useSlate } from 'slate-react'

// Import the Slate components and React plugin.
import { Editable, withReact } from 'slate-react'

const CustomEditor = {
  isBoldMarkActive(editor:EditorType) {
    const marks = Editor.marks(editor)
    return marks ? marks.bold === true : false
  },

  isCodeBlockActive(editor:EditorType) {
    const [match] = Editor.nodes(editor, {
      match: n => n.type === 'code',
    })

    return !!match
  },

  toggleBoldMark(editor :EditorType) {
    const isActive = CustomEditor.isBoldMarkActive(editor)
    if (isActive) {
      Editor.removeMark(editor, 'bold')
    } else {
      Editor.addMark(editor, 'bold', true)
    }
  },

  toggleCodeBlock(editor: EditorType) {
    const isActive = CustomEditor.isCodeBlockActive(editor)
    console.log(isActive)
    Transforms.setNodes(
      editor,
      { type: isActive ? null : 'code' },
      { match: n => Element.isElement(n) && Editor.isBlock(editor, n) }
    )
  },
}






export default function NoteEditer() {

  const [editor] = useState(() => withReact(createEditor()))
  // Render the Slate context.

  const initialValue = useMemo(
    () =>
      JSON.parse(localStorage.getItem('content')!!) || 
    [
        {
          type: 'paragraph',
          children: [{ text: 'A line of text in a paragraph.' }],
        },
      ],
    []
  )

  const renderElement = useCallback((props: RenderElementProps) => {
    switch (props.element.type) {
      case 'code':
        return <CodeElement {...props} />
      default:
        return <DefaultElement {...props} />
    }
  }, [])

  const renderLeaf = useCallback((props: RenderLeafProps) => {
    return <Leaf {...props} />
  }, [])

  const BoldButton = () => {
    const editor = useSlate();
  
    return (
      <button 
        className={`border-[1px] border-black rounded-[5px] px-[5px] ${
          CustomEditor.isBoldMarkActive(editor) ? 'font-bold text-white bg-slate-900' : ''
        }`}
        onMouseDown={event => {
          event.preventDefault()
          CustomEditor.toggleBoldMark(editor)
        }}
      >
        Bold
      </button>
    );
  }



  return (
    <Slate 
    editor={editor} 
    initialValue={initialValue}
    onChange={value=>{
      
      const isAstChange = editor.operations.some(
        (op: Operation) => 'set_selection' !== op.type
      )

      if(isAstChange) {
        const content = JSON.stringify(value)
        localStorage.setItem('content', content)
      }
    }}>
      <div className="flex gap-2 border-[1px] border-black p-1">
        <BoldButton/>
        <button
          onMouseDown={event => {
            event.preventDefault()
            CustomEditor.toggleCodeBlock(editor)
          }}
        >
          Code Block
        </button>
        </div>
      <Editable className="mt-2"
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        onKeyDown={event => {
          if (!event.ctrlKey) {
            return
          }

          // Replace the `onKeyDown` logic with our new commands.
          switch (event.key) {
            case '`': {
              console.log('작동')
              event.preventDefault()
              CustomEditor.toggleCodeBlock(editor)
              break
            }

            case 'b': {
              event.preventDefault()
              CustomEditor.toggleBoldMark(editor)
              break
            }
          }
        }}
      />
    </Slate>
  )
}

const CodeElement = (props: RenderElementProps) => {
  return (
    <pre className="bg-gray-100 border border-gray-300 rounded-md p-4 font-mono text-sm overflow-x-auto"
      {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  )
};

const DefaultElement = (props: RenderElementProps) => {
  return <p{...props.attributes}>{props.children}</p>
}



const Leaf: React.FC<RenderLeafProps> = (props) => {
  return (
    <span
      {...props.attributes}
      style={{ fontWeight: props.leaf.bold ? 'bold' : 'normal' }}
    >
      {props.children}
    </span>
  )
}