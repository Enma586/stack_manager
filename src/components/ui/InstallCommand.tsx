import { useCallback, useState } from 'react'
import { Copy, Check, Terminal } from 'lucide-react'
import { cn } from '@/lib/utils'

interface InstallCommandProps {
  command: string
}

export function InstallCommand({ command }: InstallCommandProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(command)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = command
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }, [command])

  return (
    <div
      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm"
      style={{
        background: 'color-mix(in oklch, var(--color-verde-500) 8%, var(--color-blanco-puro))',
        border: '1px solid color-mix(in oklch, var(--color-verde-400) 25%, transparent)',
      }}
    >
      <Terminal size={16} style={{ color: 'var(--color-verde-600)' }} />
      <code
        className="flex-1 text-xs font-medium"
        style={{ color: 'var(--color-carbono)' }}
      >
        $ {command}
      </code>
      <button
        onClick={handleCopy}
        className={cn(
          'flex cursor-pointer items-center gap-1 rounded-md px-2 py-1 text-xs transition-all',
        )}
        style={{
          background: copied
            ? 'color-mix(in oklch, var(--color-verde-500) 15%, transparent)'
            : 'transparent',
          color: copied
            ? 'var(--color-verde-700)'
            : 'var(--color-carbono-claro)',
        }}
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
      </button>
    </div>
  )
}
