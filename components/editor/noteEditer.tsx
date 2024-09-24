"use client"
import { CustomEditorType, CustomElement, CodeElementType } from "@/types/slate";
// Import React dependencies.
import { useState, useCallback, useMemo, useEffect, Children } from "react";
// Import the Slate editor factory.
import { collapse, createEditor, Node, NodeEntry, Operation, BaseEditor, Descendant, Transforms, Element, Editor } from 'slate'
import { ReactEditor, Slate, RenderElementProps, RenderLeafProps, useSlate } from 'slate-react'
import { ChromePicker } from 'react-color';
import { CustomEditor } from "./toolbars";
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';  // 기본 테마 또는 다른 테마 선택
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-css';


// Import the Slate components and React plugin.
import { Editable, withReact } from 'slate-react'
import resetNodes from "./resetNode";
import ColorPickerButton from "./colorPickerButton";

 


export default function NoteEditer() {

  const [editor] = useState(() => withReact(createEditor()))
  // Render the Slate context.
  const defaultValue: Descendant[] = [
    {
      type: 'paragraph',
      children: [{ 
        text: 'A line of text in a paragraph.' , 
        bold: true,
      fontSize: 20}],
    },
  ];

  const [editorContent, setEditorContent] = useState<Descendant[]>(defaultValue);
  
  useEffect(() => {
    const loadData = localStorage.getItem('content');
    if (loadData) {
      try {
        const parsedData = JSON.parse(loadData) as Descendant[];
        setEditorContent(parsedData);
      } catch (error) {
        console.error('Failed to parse stored content:', error);
        // 파싱 실패 시 기본값 사용
        setEditorContent(defaultValue);
      }
    }
  }, []);

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

  const EditorToolbar = () => {
    const editor = useSlate()

    const fontSizes = Array.from({ length: 97 }, (_, i) => i * 2 + 8);

    const marks = Editor.marks(editor) as { fontSize?: string };

    const fontSize = marks?.fontSize || '';
  
    return (
      <div className="flex gap-2">
        <button 
        className={`border-[1px] border-black rounded-[5px] px-[10px] ${
          CustomEditor.isMarkActive(editor, 'bold') ? 'font-bold text-white bg-slate-900' : ''
        }`}
        onMouseDown={event => {
          event.preventDefault()
          CustomEditor.toggleBoldMark(editor)
        }}
      >
        B
      </button>
        <button onMouseDown={(event) => {
          event.preventDefault()
          CustomEditor.toggleMark(editor, 'italic')
        }}>Italic</button>
        <select
      value={fontSize}
      onChange={(event) => {
        event.preventDefault();
        CustomEditor.setFontSize(editor, event.target.value);
      }}
    >
      <option value="">20</option>
      {fontSizes.map((size) => (
        <option key={size} value={`${size}`}>
          {size}
        </option>
      ))}
    </select>
        <ColorPickerButton/>
      </div>
    )
  }

  const handleNewDocument = () => {
    resetNodes(editor, {
      nodes: [
        {
          type: 'paragraph',
          children: [{ text: '새 문서를 시작하세요.' }],
        },
      ],
    });
  };

  return (
    <Slate 
    editor={editor} 
    initialValue={editorContent}
    onChange={value=>{
      
      const isAstChange = editor.operations.some(
        (op: Operation) => 'set_selection' !== op.type
      )

      if(isAstChange) {
        const content = JSON.stringify(value)
        localStorage.setItem('content', content)
      }
    }}>
      <div className="flex gap-2 border-[1px] border-black p-1 w-full">
        <EditorToolbar/>
        <button
          onMouseDown={event => {
            event.preventDefault()
            CustomEditor.toggleCodeBlock(editor)
          }}
        >
          {'</>'}
        </button>
        <button onClick={()=>{
          handleNewDocument()
        }}>
          NewDocument
        </button>
        </div>
      <Editable className="mt-2 w-full"
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

const CodeElement: React.FC<RenderElementProps> = (props) => {
  const { attributes, children, element } = props;
  const editor = useSlate();
  const codeElement = element as CodeElementType;
  
  const codeString = codeElement.children.map(n => n.text).join('\n');
  const language = codeElement.language || 'javascript';
  const html = Prism.highlight(codeString, Prism.languages[language], language);

  const changeLanguage = (newLanguage: CodeElementType['language']) => {
    const path = ReactEditor.findPath(editor, element);
    Transforms.setNodes(editor, { language: newLanguage }, { at: path });
  };

  return (
    <div {...attributes} className="code-block">
      <div className="code-block-header" contentEditable={false}>
        <select
          value={language}
          onChange={(e) => changeLanguage(e.target.value as CodeElementType['language'])}
        >
          <option value="javascript">JavaScript</option>
          <option value="typescript">TypeScript</option>
          <option value="html">HTML</option>
          <option value="css">CSS</option>
          <option value="json">JSON</option>
          <option value="bash">Bash</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="c++">C++</option>
          <option value="cpp">C++</option>
          <option value="csharp">C#</option>
          <option value="objectivec">Objective-C</option>
          <option value="ruby">Ruby</option>
          <option value="go">Go</option>
          <option value="perl">Perl</option>
        </select>
      </div>
      <pre>
        <code dangerouslySetInnerHTML={{ __html: html }} />
      </pre>
      {children}
    </div>
  );
};

const DefaultElement = (props: RenderElementProps) => {
  return <p{...props.attributes}>{props.children}</p>
}




const Leaf: React.FC<RenderLeafProps> = (props) => {
  let style: React.CSSProperties = {};

  if (props.leaf.bold) {
    style.fontWeight = 'bold';
  }
  if (props.leaf.italic) {
    style.fontStyle = 'italic';
  }
  if (props.leaf.fontSize) {
    style.fontSize = `${props.leaf.fontSize}px`;
  }
  if (props.leaf.color) {
    style.color = props.leaf.color;
  }

  return <span {...props.attributes} style={style}>{props.children}</span>;
};