/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface MarkdownRendererProps {
  content: string;
}

// Renderizador ligero de Markdown sin HTML crudo ni librerías externas
// Soporta: párrafos, negritas (**texto**), listas con viñetas (* o -), y listas numeradas (1.)
export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  if (!content) return null;

  const renderInline = (text: string): React.ReactNode[] => {
    // Parser de negritas **texto**
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} className="font-semibold text-ink">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return <React.Fragment key={i}>{part}</React.Fragment>;
    });
  };

  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let currentList: { type: 'ul' | 'ol'; items: string[] } | null = null;

  const flushList = () => {
    if (!currentList) return;
    const ListTag = currentList.type;
    elements.push(
      <ListTag
        key={`list-${elements.length}`}
        className={`space-y-1 my-2 pl-4 text-ink ${
          currentList.type === 'ul' ? 'list-disc' : 'list-decimal'
        }`}
      >
        {currentList.items.map((item, idx) => (
          <li key={idx} className="leading-relaxed">
            {renderInline(item)}
          </li>
        ))}
      </ListTag>
    );
    currentList = null;
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Línea vacía
    if (!line) {
      flushList();
      continue;
    }

    // Lista con viñetas (* item o - item)
    const bulletMatch = line.match(/^[-*]\s+(.+)/);
    if (bulletMatch) {
      if (currentList && currentList.type !== 'ul') flushList();
      if (!currentList) currentList = { type: 'ul', items: [] };
      currentList.items.push(bulletMatch[1]);
      continue;
    }

    // Lista numerada (1. item)
    const numberMatch = line.match(/^\d+\.\s+(.+)/);
    if (numberMatch) {
      if (currentList && currentList.type !== 'ol') flushList();
      if (!currentList) currentList = { type: 'ol', items: [] };
      currentList.items.push(numberMatch[1]);
      continue;
    }

    // Párrafo normal
    flushList();
    elements.push(
      <p key={`p-${elements.length}`} className="my-1.5 leading-relaxed text-ink">
        {renderInline(line)}
      </p>
    );
  }

  flushList();

  return <div className="space-y-1 text-xs">{elements}</div>;
};
