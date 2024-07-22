import { MDXRemote } from 'next-mdx-remote/rsc';
import type { MDXComponents } from 'mdx/types';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 style={{ fontSize: '25px', marginTop: '25px', marginBottom: '15px', fontWeight: '700' }}>
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 style={{ fontSize: '20px', marginTop: '15px', marginBottom: '15px', fontWeight: '700' }}>
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 style={{ fontSize: '25px', marginTop: '25px', marginBottom: '15px' }}>{children}</h3>
    ),
    p: ({ children }) => <p style={{ marginTop: '8px', marginBottom: '8px' }}>{children}</p>,
    strong: ({ children }) => (
      <strong style={{ fontWeight: '600', marginTop: '25px' }}>{children}</strong>
    ),
    ol: ({ children }) => (
      <ol style={{ marginTop: '8px', marginBottom: '8px', listStyleType: 'decimal' }}>
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li style={{ marginTop: '8px', marginBottom: '8px', marginLeft: '18px' }}>{children}</li>
    ),
    ...components,
  };
}

export default function Summary({ sourceText }: { sourceText: string }) {
  return <MDXRemote source={sourceText} components={useMDXComponents({})} />;
}
