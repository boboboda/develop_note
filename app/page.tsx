import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import Main from "@/components/home/main";


// import dynamic from 'next/dynamic'

// const NoteEditer = dynamic(() => import('@/components/noteEditer'), { 
//   ssr: false,
//   loading: () => <p>Loading editor...</p>
// })



export default function Home() {
  return (
    <div>
      <Main/>
    </div>
  );
}
