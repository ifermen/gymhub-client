import ReactMarkdown from 'react-markdown';
import { useMemo, useState, useRef, useEffect, useCallback } from 'react';
import { LineVertical } from '../components/Line/LineVertical';

interface MarkdownRenderProps {
  text: string;
  columnsLayout?: boolean;
}

interface Section {
  id: string;
  title: string;
  content: string;
}

const parseSections = (text: string): Section[] => {
  // Dividir por headers nivel 1 o 2 (# o ##)
  const sections = text.split(/(?=^#{1,2}\s)/m);

  return sections
    .filter(section => section.trim().length > 0)
    .map((section, index) => {
      // Extraer el título (primera línea que sea header)
      const titleMatch = section.match(/^#+\s+(.+?)$/m);
      const title = titleMatch ? titleMatch[1] : `Sección ${index + 1}`;

      // Crear ID basado en el título
      const id = title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .substring(0, 50);

      return {
        id,
        title,
        content: section
      };
    });
};

const balanceIntoTwoColumns = (sections: Section[], heights: Record<string, number>) => {
  const col1: Section[] = [];
  const col2: Section[] = [];
  let height1 = 0;
  let height2 = 0;

  sections.forEach(section => {
    const sectionHeight = heights[section.id] || 0;
    if (height1 <= height2) {
      col1.push(section);
      height1 += sectionHeight;
    } else {
      col2.push(section);
      height2 += sectionHeight;
    }
  });

  return { col1, col2 };
};

export default function MarkdownRender({ text, columnsLayout = true }: MarkdownRenderProps) {
  const sections = useMemo(() => parseSections(text), [text]);
  const [heights, setHeights] = useState<Record<string, number>>({});
  const contentRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const setRef = useCallback((id: string) => (el: HTMLDivElement | null) => {
    if (el) {
      contentRefs.current[id] = el;
    }
  }, []);

  const markdownComponents = {
    h1: ({ children }: any) => (
      <span className="text-xl font-semibold">
        {children}
      </span>
    ),
    h2: ({ children }: any) => (
      <span className="text-lg font-semibold">
        {children}
      </span>
    ),
    ul: ({ children }: any) => (
      <ul className='text-base list-disc'>
        {children}
      </ul>
    ),
    ol: ({ children }: any) => (
      <ol className='text-lg list-decimal list'>
        {children}
      </ol>
    ),
    li: ({ children }: any) => (
      <li className='ml-7'>
        {children}
      </li>
    )
  };

  // Calcular alturas después del render
  useEffect(() => {
    const newHeights: Record<string, number> = {};
    sections.forEach(section => {
      if (contentRefs.current[section.id]) {
        newHeights[section.id] = contentRefs.current[section.id]?.scrollHeight || 0;
      }
    });
    setHeights(newHeights);
  }, [sections]);

  if (!columnsLayout || sections.length === 1) {
    return (
      <ReactMarkdown components={markdownComponents}>
        {text}
      </ReactMarkdown>
    );
  }

  const { col1, col2 } = balanceIntoTwoColumns(sections, heights);

  return (
    <div className="flex flex-row gap-6">
      <div className="flex-1">
        {col1.map((section) => (
          <div className="pt-3" key={section.id} ref={setRef(section.id)}>
            <ReactMarkdown components={markdownComponents}>
              {section.content}
            </ReactMarkdown>
          </div>
        ))}
      </div>
      <LineVertical />
      <div className="flex-1">
        {col2.map((section) => (
          <div className="pt-3" key={section.id} ref={setRef(section.id)}>
            <ReactMarkdown components={markdownComponents}>
              {section.content}
            </ReactMarkdown>
          </div>
        ))}
      </div>
    </div>
  );
}