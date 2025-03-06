"use client";

import { useEffect, useRef } from 'react';
import DOMPurify from 'isomorphic-dompurify';

interface ArticleContentProps {
  content: string;
}

export default function ArticleContent({ content }: ArticleContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add lazy loading to images
    if (contentRef.current) {
      const images = contentRef.current.getElementsByTagName('img');
      Array.from(images).forEach(img => {
        img.loading = 'lazy';
        img.classList.add('rounded-lg', 'my-4');
      });
    }
  }, [content]);

  return (
    <div 
      ref={contentRef}
      className="prose prose-lg dark:prose-invert max-w-none"
      dangerouslySetInnerHTML={{ 
        __html: DOMPurify.sanitize(content) 
      }}
    />
  );
} 