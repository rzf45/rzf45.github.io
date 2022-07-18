export function CodeBlock(props: {
  text: string
}) {
  const lines = props.text.split('\n')

  return (
    <div className="code-block">
      {lines.map((line, num) => (
        <div className="line-wrapper">
          <code className="line-number">{num + 1}</code>
          <code className="line-content">{line}</code>
        </div>
      ))}
      {/* @ts-ignore */}
      <style jsx>{`
        .code-block {
          width: 100%;
          overflow: hidden;
          padding-block: 1rem;
          background-color: #1f2937;
          color: white;
        }

        .code-block .line-wrapper {
          display: flex;
        }

        .code-block .line-number {
          width: 48px;
          flex-shrink: 0;
          text-align: right;
          padding-inline: 0.5rem;
          user-select: none;
        }
        
        .code-block .line-content {
          padding-inline: 0.5rem;
          word-break: break-all;
          white-space: pre-wrap;
        }
      `}</style>
    </div>
  )
}