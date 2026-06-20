import { useEffect, useRef, useCallback } from 'react'
import { useState } from 'react'
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
          background: 'var(--color-carbono)',
          borderBottom: '1px solid oklch(0.3 0.01 146 / 0.5)',
        }}
      >
        <div className="flex items-center gap-2">
          <span className="flex size-2.5 rounded-full" style={{ background: '#ef4444' }} />
          <span className="flex size-2.5 rounded-full" style={{ background: '#eab308' }} />
          <span className="flex size-2.5 rounded-full" style={{ background: '#4ade80' }} />
          <span
            className="ml-2 text-[11px] uppercase tracking-wider"
            style={{ color: 'var(--color-verde-400)' }}
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
              ? 'oklch(0.62 0.19 146 / 0.2)'
              : 'oklch(1 0 0 / 0.08)',
            color: copied
              ? 'var(--color-verde-400)'
              : 'var(--color-verde-100)',
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
