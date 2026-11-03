'use client';

import React from 'react';
import Link from 'next/link';

interface ChatMarkdownProps {
  content: string;
  className?: string;
  isUserMessage?: boolean;
}

/**
 * Parses inline markdown:
 * - [Link Label](url)
 * - **Bold Text**
 * - *Italic Text*
 * - `Inline Code`
 */
function renderInlineMarkdown(text: string, isUserMessage: boolean = false, keyPrefix: string = 'inline'): React.ReactNode[] {
  // Regex pattern matching:
  // 1 & 2: [label](url)
  // 3: **bold**
  // 4: *italic*
  // 5: `code`
  const regex = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*|`([^`]+)`/g;
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let counter = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(
        <span key={`${keyPrefix}-t-${counter++}`}>
          {text.substring(lastIndex, match.index)}
        </span>
      );
    }

    if (match[1] && match[2]) {
      // Link
      const label = match[1];
      const url = match[2];
      const isInternal = url.startsWith('/') || url.startsWith('#');

      if (isInternal) {
        nodes.push(
          <Link
            key={`${keyPrefix}-l-${counter++}`}
            href={url}
            className={`font-bold underline transition-colors cursor-pointer ${
              isUserMessage
                ? 'text-sky-200 hover:text-white underline-offset-2'
                : 'text-[#005596] hover:text-[#004276] underline-offset-2'
            }`}
          >
            {label}
          </Link>
        );
      } else {
        nodes.push(
          <a
            key={`${keyPrefix}-a-${counter++}`}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={`font-bold underline transition-colors ${
              isUserMessage
                ? 'text-sky-200 hover:text-white underline-offset-2'
                : 'text-[#005596] hover:text-[#004276] underline-offset-2'
            }`}
          >
            {label}
          </a>
        );
      }
    } else if (match[3]) {
      // Bold **text**
      nodes.push(
        <strong
          key={`${keyPrefix}-b-${counter++}`}
          className={`font-black ${isUserMessage ? 'text-white' : 'text-slate-950'}`}
        >
          {match[3]}
        </strong>
      );
    } else if (match[4]) {
      // Italic *text*
      nodes.push(
        <em
          key={`${keyPrefix}-i-${counter++}`}
          className={`italic ${isUserMessage ? 'text-blue-100' : 'text-slate-600'}`}
        >
          {match[4]}
        </em>
      );
    } else if (match[5]) {
      // Inline Code `text`
      nodes.push(
        <code
          key={`${keyPrefix}-c-${counter++}`}
          className={`px-1.5 py-0.5 rounded text-[11px] font-mono ${
            isUserMessage
              ? 'bg-blue-800 text-blue-100'
              : 'bg-slate-100 text-slate-800 border border-slate-200'
          }`}
        >
          {match[5]}
        </code>
      );
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    nodes.push(
      <span key={`${keyPrefix}-end-${counter++}`}>
        {text.substring(lastIndex)}
      </span>
    );
  }

  return nodes;
}

export function ChatMarkdown({ content, className = '', isUserMessage = false }: ChatMarkdownProps) {
  if (!content) return null;

  const lines = content.split('\n');

  return (
    <div className={`space-y-1.5 leading-relaxed ${className}`}>
      {lines.map((line, lineIdx) => {
        const trimmed = line.trim();

        // Empty line -> paragraph separator
        if (!trimmed) {
          return <div key={`p-break-${lineIdx}`} className="h-1.5" />;
        }

        // Bullet point
        if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
          const bulletContent = trimmed.substring(2);
          return (
            <div key={`bullet-${lineIdx}`} className="flex items-start gap-2 pl-1.5">
              <span
                className={`text-xs font-bold mt-0.5 shrink-0 ${
                  isUserMessage ? 'text-sky-300' : 'text-[#005596]'
                }`}
              >
                &bull;
              </span>
              <span className="flex-1">
                {renderInlineMarkdown(bulletContent, isUserMessage, `b-${lineIdx}`)}
              </span>
            </div>
          );
        }

        // Numbered list (e.g. "1. ")
        const numberedMatch = trimmed.match(/^(\d+)\.\s+(.+)$/);
        if (numberedMatch) {
          return (
            <div key={`num-${lineIdx}`} className="flex items-start gap-2 pl-1.5">
              <span
                className={`text-[11px] font-mono font-bold mt-0.5 shrink-0 ${
                  isUserMessage ? 'text-sky-300' : 'text-[#005596]'
                }`}
              >
                {numberedMatch[1]}.
              </span>
              <span className="flex-1">
                {renderInlineMarkdown(numberedMatch[2], isUserMessage, `n-${lineIdx}`)}
              </span>
            </div>
          );
        }

        // Standard paragraph line
        return (
          <p key={`line-${lineIdx}`}>
            {renderInlineMarkdown(line, isUserMessage, `l-${lineIdx}`)}
          </p>
        );
      })}
    </div>
  );
}
