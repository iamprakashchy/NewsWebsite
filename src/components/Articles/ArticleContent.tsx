"use client";

import { useEffect, useRef } from 'react';
import DOMPurify from 'isomorphic-dompurify';
import { cn } from '@/lib/utils';

interface ArticleContentProps {
  content: string;
  className?: string;
}

export default function ArticleContent({ content, className }: ArticleContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      // Enhance images
      const images = contentRef.current.getElementsByTagName('img');
      Array.from(images).forEach(img => {
        img.loading = 'lazy';
        img.decoding = 'async';
        img.classList.add(
          'rounded-lg',
          'my-6',
          'w-full',
          'h-auto',
          'object-cover',
          'transition-all',
          'duration-300',
          'hover:shadow-lg'
        );
      });

      // Enhance links
      const links = contentRef.current.getElementsByTagName('a');
      Array.from(links).forEach(link => {
        link.classList.add(
          'text-primary',
          'hover:text-primary/80',
          'transition-colors',
          'underline',
          'decoration-primary/30',
          'hover:decoration-primary/60'
        );
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
      });

      // Style blockquotes
      const quotes = contentRef.current.getElementsByTagName('blockquote');
      Array.from(quotes).forEach(quote => {
        quote.classList.add(
          'border-l-4',
          'border-primary',
          'pl-4',
          'italic',
          'my-6'
        );
      });
    }
  }, [content]);

  const sanitizedContent = DOMPurify.sanitize(content, {
    ADD_TAGS: ['iframe'],
    ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling']
  });

  return (
    <div
      ref={contentRef}
      className={cn(
        "prose prose-lg dark:prose-invert max-w-none",
        "font-poppins font-normal",
        "prose-headings:font-inter prose-headings:font-bold",
        "prose-a:no-underline",
        "prose-img:rounded-lg prose-img:shadow-md",
        "prose-blockquote:font-normal",
        "prose-pre:bg-muted prose-pre:rounded-lg",
        "prose-code:text-primary prose-code:bg-muted/50 prose-code:rounded prose-code:px-1",
        className
      )}
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    />
  );
}   