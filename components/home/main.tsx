import NoteEditer from "../editor/noteEditer";

export default function Main(){
    return(
    <div className=" w-full flex flex-col items-center">
        <h3 className=" text-[50px]">텍스트 에디터</h3>
        <NoteEditer/>
    </div>)
}