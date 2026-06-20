import { useRef } from 'react'
import { Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
}

export function SearchInput({ value, onChange }: SearchInputProps) {
  const ref = useRef<HTMLInputElement>(null)

  return (
    <div className="relative">
      <Search
        size={18}
        className="absolute left-3.5 top-1/2 -translate-y-1/2"
        style={{ color: 'var(--color-verde-500)' }}
      />
      <input
        ref={ref}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Buscar tecnologia..."
        className={cn(
          'w-full rounded-xl border-2 py-3 pl-10 pr-10 text-sm',
          'bg-white outline-none transition-all duration-200',
          'placeholder:italic placeholder:opacity-50',
        )}
        style={{
          borderColor: value
            ? 'var(--color-verde-400)'
            : 'color-mix(in oklch, var(--color-verde-300) 40%, transparent)',
          color: 'var(--color-carbono)',
          boxShadow: value ? 'var(--shadow-enfasis)' : 'var(--shadow-caja)',
        }}
        onFocus={(e) => {
          e.target.style.borderColor = 'var(--color-verde-400)'
          e.target.style.boxShadow = 'var(--shadow-enfasis)'
        }}
        onBlur={(e) => {
          if (!value) {
            e.target.style.borderColor =
              'color-mix(in oklch, var(--color-verde-300) 40%, transparent)'
            e.target.style.boxShadow = 'var(--shadow-caja)'
          }
        }}
      />
      {value && (
        <button
          onClick={() => { onChange(''); ref.current?.focus() }}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 cursor-pointer transition-opacity hover:opacity-70"
          style={{ color: 'var(--color-carbono-claro)' }}
        >
          <X size={18} />
        </button>
      )}
    </div>
  )
}
