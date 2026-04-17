import ReactMarkdown from 'react-markdown';

interface MarkdownRenderProps {
  text: string
}
export default function MarkdownRender({ text }: MarkdownRenderProps) {

  return (
    <ReactMarkdown
      components={{
        h1: ({ children }) => (
          <span className="text-xl font-semibold">
            {children}
          </span>
        ),
        ul: ({ children }) => (
          <ul className='text-base list-disc'>
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className='text-lg list-decimal list'>
            {children}
          </ol>
        ),
        li: ({ children }) => (
          <li className='ml-7'>
            {children}
          </li>
        )
      }}
    >
      {text}
    </ReactMarkdown>
  )
}