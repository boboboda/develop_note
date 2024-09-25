import RichTextExample from "../editor/noteEditor";
import NoteEditor from "../editor/noteEditor";

export default function Main(){
    return(
    <div className=" w-full flex flex-col items-center">
        {/* <h3 className=" text-[20px]">텍스트 에디터</h3> */}
        <NoteEditor/>
    </div>)
}