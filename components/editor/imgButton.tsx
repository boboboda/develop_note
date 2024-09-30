import React, { useRef, ChangeEvent } from "react";
import { EditorContent, useCurrentEditor } from "@tiptap/react";
import { Button } from "@nextui-org/button";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { Image as BaseImage } from "@tiptap/extension-image";

const ImgButton: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const Image = BaseImage.extend({
    group: "block",
  });

  const { editor } = useCurrentEditor();

  // 파일 업로드 처리 함수
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // files가 null일 수 있으므로 optional chaining 사용
    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        const imageUrl = reader.result as string; // reader.result는 string | ArrayBuffer 타입이므로 string으로 캐스팅
        if (imageUrl) {
          editor?.chain().focus().setImage({ src: imageUrl }).run(); // editor가 null이 아닐 때만 실행
        }
      };

      reader.readAsDataURL(file); // 파일을 base64로 읽음
    }
  };

  // 버튼 클릭 시 파일 입력창 열기
  const handleButtonClick = () => {
    fileInputRef.current?.click(); // fileInputRef가 null이 아닐 때만 click 호출
  };

  return (
    <>
      {/* 파일 입력을 위한 숨겨진 input 요소 */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleImageUpload}
      />

      {/* 클릭 시 파일 선택 창을 여는 버튼 */}
      <Button className="relative opacity-0 pointer-events-none">
        {/* 이 버튼은 숨겨지고 클릭되지 않음 */}
      </Button>

      <Button onClick={handleButtonClick} className="relative">
        <PhotoIcon className="h-4 w-4"></PhotoIcon>
      </Button>
    </>
  );
};

export default ImgButton;
