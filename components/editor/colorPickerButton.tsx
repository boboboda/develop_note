import React, { useState, useCallback } from 'react';
import { useSlate } from 'slate-react';
import { Editor } from 'slate';
import { HexColorPicker } from "react-colorful";

const ColorPickerButton = () => {
  const [showPicker, setShowPicker] = useState(false);
  const editor = useSlate();

  const currentColor = Editor.marks(editor)?.color as string || '#000000';

  const handleColorChange = useCallback((newColor: string) => {
    CustomEditor.setColor(editor, newColor);
  }, [editor]);

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button
        onMouseDown={(event) => {
          event.preventDefault();
          setShowPicker(!showPicker);
        }}
        style={{
          fontWeight: 'bold',
          padding: '5px 10px',
          border: '1px solid #ccc',
          borderRadius: '3px',
          background: 'white',
          cursor: 'pointer',
          position: 'relative',
        }}
      >
        A
        <div
          style={{
            position: 'absolute',
            bottom: '0',
            left: '0',
            right: '0',
            height: '3px',
            background: currentColor,
          }}
        />
      </button>
      {showPicker && (
        <div style={{ 
          position: 'absolute', 
          zIndex: 1, 
          top: '100%', 
          left: '0',
          marginTop: '5px',
          boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
        }}>
          <HexColorPicker color={currentColor} onChange={handleColorChange} />
        </div>
      )}
    </div>
  );
};

// CustomEditor 객체 (이전에 정의한 대로)
const CustomEditor = {
  setColor(editor: Editor, color: string) {
    Editor.addMark(editor, 'color', color);
  },
};

export default ColorPickerButton;