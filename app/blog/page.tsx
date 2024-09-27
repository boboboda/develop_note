import { title } from "@/components/primitives";
import dynamic from 'next/dynamic';

const Document = dynamic(() => import("@/components/testEditor/testEditor"), { ssr: false });

export default function BlogPage() {
  return (
    <div className="flex flex-col h-full w-full">
      <div className="h-full w-full">
      <Document></Document>
      </div>
    </div>
  );
}
