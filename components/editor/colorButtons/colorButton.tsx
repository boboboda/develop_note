'use client'

import React, { useEffect } from "react";
import {Dropdown, ButtonGroup, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useCurrentEditor } from "@tiptap/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

type ColorKey = "black" | "red" | "blue" | "green" | "yellow" | "purple";

interface ColorOption {
  key: ColorKey;
  label: string;
  value: string;
}

const colorOptions: ColorOption[] = [
  { key: "black", label: "Black", value: "#000000" },
  { key: "red", label: "Red", value: "#FF0000" },
  { key: "blue", label: "Blue", value: "#0000FF" },
  { key: "green", label: "Green", value: "#00FF00" },
  { key: "yellow", label: "Yellow", value: "#FFFF00" },
  { key: "purple", label: "Purple", value: "#800080" },
];

export default function ColorButton() {
  const { editor } = useCurrentEditor();
  const [selectedKeys, setSelectedKeys] = React.useState<Set<ColorKey>>(new Set(["black"]));
  const [currentEditorColor, setCurrentEditorColor] = React.useState<string>("#000000");

  const selectedColor = React.useMemo(() => {
    const selectedKey = Array.from(selectedKeys)[0] as ColorKey;
    return colorOptions.find((option) => option.key === selectedKey);
  }, [selectedKeys]);

  useEffect(() => {
    if (editor) {
      const updateColor = () => {
        const color = editor.getAttributes('textStyle').color || "#000000";
        setCurrentEditorColor(color);
        
        const matchingOption = colorOptions.find(option => option.value === color);
        if (matchingOption) {
          setSelectedKeys(new Set([matchingOption.key]));
        }
      };

      editor.on('selectionUpdate', updateColor);
      editor.on('update', updateColor);

      return () => {
        editor.off('selectionUpdate', updateColor);
        editor.off('update', updateColor);
      };
    }
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <ButtonGroup variant="flat" className="">
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Button>
          <div
          className={editor.isActive('textStyle', { color: currentEditorColor }) ? 'is-active' : 'absolute'}
          style={{
            width: "15px", 
            height: "15px",  
            backgroundColor: currentEditorColor,
            border: `2px solid ${currentEditorColor}`,
          }}/>
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          disallowEmptySelection
          aria-label="Color options"
          selectedKeys={selectedKeys}
          selectionMode="single"
          onSelectionChange={(keys) => {
            const newKeys = keys as Set<ColorKey>;
            setSelectedKeys(newKeys);

            const selectedKey = Array.from(newKeys)[0] as ColorKey;
            const selectColor = colorOptions.find((option) => option.key === selectedKey);

            if (selectColor) {
              editor.chain().focus().setColor(selectColor.value).run();
              setCurrentEditorColor(selectColor.value);
            }
          }}
        >
          {colorOptions.map((option) => (
            <DropdownItem key={option.key} textValue={option.label}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div 
                  style={{
                    width: "20px", 
                    height: "20px", 
                    borderRadius: "50%", 
                    backgroundColor: option.value,
                    marginRight: "10px"
                  }}
                />
                {option.label}
              </div>
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </ButtonGroup>
  );
}