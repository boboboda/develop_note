import '@/styles/CodeBlockComponent.scss'
import { NodeViewContent, NodeViewWrapper, NodeViewProps } from '@tiptap/react'
import React from 'react'
import { Node as ProsemirrorNode } from 'prosemirror-model'



const CodeBlockComponent = (props: NodeViewProps) => {
  const { node, updateAttributes, extension } = props;

  return (
    <NodeViewWrapper className="code-block">
      <select 
        contentEditable={false} 
        defaultValue={node.attrs.language} 
        onChange={event => updateAttributes({ language: event.target.value })}
      >
        <option value="null">auto</option>
        <option disabled>—</option>
        {extension.options.lowlight.listLanguages().map((lang: string, index: number) => (
          <option key={index} value={lang}>{lang}</option>
        ))}
      </select>
      <pre>
        <NodeViewContent as="code" />
      </pre>
    </NodeViewWrapper>
  )
}

export default CodeBlockComponent