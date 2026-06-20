import { useEffect, useRef, useCallback, useState } from 'react'
import Prism from 'prismjs'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-yaml'
import { Copy, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Snippet } from '@/types'

interface CodeBlockProps {
  snippet: Snippet
}

const languageMap: Record<string, string> = {
  typescript: 'typescript',
  javascript: 'javascript',
  json: 'json',
  yaml: 'yaml',
}

export function CodeBlock({ snippet }: CodeBlockProps) {
  const codeRef = useRef<HTMLElement>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current)
    }
  }, [snippet])

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(snippet.code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = snippet.code
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }, [snippet.code])

  const lang = languageMap[snippet.language] || 'typescript'

  return (
    <div
      className="overflow-hidden rounded-xl shadow-sm"
      style={{ background: 'var(--color-blanco-puro)' }}
    >
      <div
        className="flex items-center justify-between px-4 py-2.5"
        style={{
          background: 'var(--color-editor-bg)',
          borderBottom: '1px solid var(--color-editor-header-border)',
        }}
      >
        <div className="flex items-center gap-2">
          <span className="flex size-2.5 rounded-full" style={{ background: 'var(--color-editor-dot-red)' }} />
          <span className="flex size-2.5 rounded-full" style={{ background: 'var(--color-editor-dot-yellow)' }} />
          <span className="flex size-2.5 rounded-full" style={{ background: 'var(--color-editor-dot-green)' }} />
          <span
            className="ml-2 text-[11px] uppercase tracking-wider"
            style={{ color: 'var(--color-editor-label)' }}
          >
            {snippet.name} · {snippet.language}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className={cn(
            'flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200',
          )}
          style={{
            background: copied
              ? 'var(--color-editor-btn-bg-copied)'
              : 'var(--color-editor-btn-bg)',
            color: copied
              ? 'var(--color-editor-btn-text-hover)'
              : 'var(--color-editor-btn-text)',
          }}
        >
          {copied ? (
            <>
              <Check size={14} />
              Copiado
            </>
          ) : (
            <>
              <Copy size={14} />
              Copiar
            </>
          )}
        </button>
      </div>

      <div className="overflow-x-auto">
        <pre className="!m-0 !rounded-none !border-0 !bg-transparent">
          <code ref={codeRef} className={`language-${lang}`}>
            {snippet.code}
          </code>
        </pre>
      </div>
    </div>
  )
}
