"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type MarkdownContentProps = {
  content: string;
};

export default function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <div className="markdown-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2: ({ children }) => <h3 style={{ marginTop: "1.5rem", marginBottom: "0.75rem", fontSize: "1.25rem", fontWeight: 700 }}>{children}</h3>,
          h3: ({ children }) => <h4 style={{ marginTop: "1.25rem", marginBottom: "0.5rem", fontSize: "1.1rem", fontWeight: 600 }}>{children}</h4>,
          p: ({ children }) => <p style={{ marginBottom: "1rem", lineHeight: "1.7" }}>{children}</p>,
          ul: ({ children }) => <ul style={{ marginBottom: "1rem", paddingLeft: "1.5rem", listStyleType: "disc" }}>{children}</ul>,
          ol: ({ children }) => <ol style={{ marginBottom: "1rem", paddingLeft: "1.5rem", listStyleType: "decimal" }}>{children}</ol>,
          li: ({ children }) => <li style={{ marginBottom: "0.5rem", lineHeight: "1.6" }}>{children}</li>,
          a: ({ href, children }) => (
            <a href={href} className="inline-link" style={{ color: "#0066cc", textDecoration: "underline" }}>
              {children}
            </a>
          ),
          strong: ({ children }) => <strong style={{ fontWeight: 700 }}>{children}</strong>,
          em: ({ children }) => <em style={{ fontStyle: "italic" }}>{children}</em>,
          blockquote: ({ children }) => (
            <blockquote style={{ 
              borderLeft: "4px solid #0066cc", 
              paddingLeft: "1rem", 
              marginLeft: 0, 
              marginBottom: "1rem",
              fontStyle: "italic",
              color: "#53627a"
            }}>
              {children}
            </blockquote>
          ),
          code: ({ children }) => (
            <code style={{ 
              background: "#f0f4f8", 
              padding: "0.2rem 0.4rem", 
              borderRadius: "4px",
              fontSize: "0.9em",
              fontFamily: "monospace"
            }}>
              {children}
            </code>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
