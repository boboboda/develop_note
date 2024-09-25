"use client"


import dynamic from 'next/dynamic';
const Tiptap = dynamic(() => import('./tiptap'), { ssr: false });

export default function NoteEditor() {
  return(
    <div className=" mx-3">
        <Tiptap/>
    </div>
  )
}