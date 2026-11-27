import { useState, useEffect } from 'react';
import './Homepage.css'
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";

import {BookmarkOne} from "@icon-park/react"

type DocMetaData = {
  title: string; 
  slug: string;
  order: number;
}

export default function HomePage() {
  const [docMetadatas, setDocMetadatas] = useState<DocMetaData[]>([])
  const [selectedSlug, setSelectedSlug] = useState<string>("intro"); // 确定是哪一篇文章被选中 
  const [markdown, setMarkdown] = useState("")                           // 正文内容 

  const selectedDoc = docMetadatas.find((doc) => doc.slug === selectedSlug)

  // Part 1: 渲染目录并选中首页 
  useEffect(() => {
    const controller = new AbortController();
    async function loadDocTitles() {
      try {
        const response = await fetch("/api/docs/", {signal: controller.signal});
        const data = (await response.json()) as DocMetaData[]; 
        setDocMetadatas([...data].sort((a, b) => a.order - b.order));
      } catch (err) {
        if (controller.signal.aborted) return;
        console.log(err);
      } 
    }
    void loadDocTitles();
    return () => controller.abort();
  }, []);
  
  // Part 2: 选中 slug 后加载文章 
  useEffect(() => {
    const controller = new AbortController();
    async function loadDoc() {
      try {
        const response = await fetch(
          `/api/docs/${encodeURIComponent(selectedSlug)}`,
          { signal: controller.signal },
        );
        const data = (await response.json());
        setMarkdown(data);
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error(error);
        }
      }
    }
    void loadDoc();
    return () => controller.abort();
  }, [selectedSlug]);

  return (
    <div className='docs-page'>


      <aside>
        <h1 className="aside-header"><BookmarkOne theme="outline" size="30" />页面介绍</h1>
        <nav className='doc-nav'>
          {docMetadatas.map((doc) => (
            <button key={doc.slug} type="button" className={`doc-nav-item ${selectedSlug === doc.slug ? "active" : ""}`} onClick={() => setSelectedSlug(doc.slug)}>
              {doc.title}
            </button>
          ))}
        </nav>
      </aside>


      <section className='doc-content'>
        <h2 className='doc-title'>{selectedDoc?.title}</h2>
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSlug]}>{markdown}</ReactMarkdown>
      </section>
      <section className='doc-toc'>
        
      </section>

    </div>
  );
}