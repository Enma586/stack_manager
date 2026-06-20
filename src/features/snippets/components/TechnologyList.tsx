import { cn } from '@/lib/utils'
import type { Snippet } from '@/types'

interface TechnologyListProps {
  technologies: Snippet[]
  selectedId: string | null
  onSelect: (tech: Snippet) => void
}

export function TechnologyList({ technologies, selectedId, onSelect }: TechnologyListProps) {
  if (technologies.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center rounded-xl py-16"
        style={{ background: 'var(--color-blanco-puro)' }}
      >
        <span className="text-4xl opacity-30">📭</span>
        <p className="mt-3 text-sm" style={{ color: 'var(--color-carbono-claro)' }}>
          No encontramos esa tecnología
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-1.5">
      {technologies.map((tech) => {
        const isSelected = tech.id === selectedId
        return (
          <button
            key={tech.id}
            onClick={() => onSelect(tech)}
            className={cn(
              'flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm transition-all duration-150 cursor-pointer',
              isSelected
                ? 'shadow-sm'
                : 'hover:opacity-80',
            )}
            style={{
              background: isSelected
                ? 'var(--color-verde-500)'
                : 'var(--color-blanco-puro)',
              color: isSelected
                ? 'var(--color-blanco-puro)'
                : 'var(--color-carbono)',
              boxShadow: isSelected
                ? '0 2px 8px oklch(0.62 0.19 146 / 0.3)'
                : 'var(--shadow-caja)',
            }}
          >
            <span
              className="flex size-7 shrink-0 items-center justify-center rounded-md text-xs font-bold"
              style={{
                background: isSelected
                  ? 'oklch(1 0 0 / 0.2)'
                  : 'var(--color-verde-100)',
                color: isSelected
                  ? 'var(--color-blanco-puro)'
                  : 'var(--color-verde-700)',
              }}
            >
              {tech.name.charAt(0)}
            </span>
            <div className="flex-1 min-w-0">
              <div className="truncate font-medium">{tech.name}</div>
              <div
                className="truncate text-xs"
                style={{
                  color: isSelected
                    ? 'oklch(1 0 0 / 0.7)'
                    : 'var(--color-carbono-claro)',
                }}
              >
                {tech.category}
              </div>
            </div>
            <span
              className="shrink-0 text-[10px] uppercase tracking-wider rounded-full px-2 py-0.5"
              style={{
                background: isSelected
                  ? 'oklch(1 0 0 / 0.15)'
                  : 'var(--color-verde-100)',
                color: isSelected
                  ? 'var(--color-blanco-puro)'
                  : 'var(--color-verde-700)',
              }}
            >
              {tech.language}
            </span>
          </button>
        )
      })}
    </div>
  )
}
