import { useState, useMemo } from 'react'
import snippetsData from '@/data/snippets.json'
import type { Snippet, SnippetCollection } from '@/types'
import { SearchInput } from '@/components/ui/SearchInput'
import { TechnologyList } from '@/features/snippets/components/TechnologyList'
import { CodeBlock } from '@/components/ui/CodeBlock'
import { InstallCommand } from '@/components/ui/InstallCommand'

const data = (snippetsData as SnippetCollection).technologies

export default function SnippetsPage() {
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<Snippet | null>(null)

  const filtered = useMemo(() => {
    if (!search.trim()) return data
    const q = search.toLowerCase().trim()
    return data.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.language.toLowerCase().includes(q),
    )
  }, [search])

  const handleSelect = (tech: Snippet) => {
    setSelected(tech)
  }

  return (
    <div
      className="mx-auto flex min-h-screen flex-col px-4 py-8"
      style={{ maxWidth: '1100px' }}
    >
      {/* header */}
      <header className="mb-8">
        <div className="flex items-center gap-3">
          <div
            className="flex size-10 items-center justify-center rounded-xl"
            style={{
              background: 'var(--color-verde-500)',
              boxShadow: '0 4px 12px oklch(0.62 0.19 146 / 0.3)',
            }}
          >
            <span className="text-lg">📦</span>
          </div>
          <div>
            <h1
              className="text-xl font-bold tracking-tight"
              style={{ color: 'var(--color-carbono)' }}
            >
              SnippetBox
            </h1>
            <p className="text-xs" style={{ color: 'var(--color-carbono-claro)' }}>
              Node.js / NestJS · {data.length} tecnologías
            </p>
          </div>
        </div>
      </header>

      {/* search */}
      <div className="mb-6">
        <SearchInput value={search} onChange={setSearch} />
      </div>

      {/* main content */}
      <div
        className="flex flex-1 flex-col gap-6"
        style={selected ? {} : { maxWidth: '480px' }}
      >
        {/* list */}
        <div style={selected ? { display: 'grid', gridTemplateColumns: '320px 1fr', gap: '1.5rem', alignItems: 'start' } : {}}>
          <div>
            <TechnologyList
              technologies={filtered}
              selectedId={selected?.id ?? null}
              onSelect={handleSelect}
            />
          </div>

          {/* detail */}
          {selected && (
            <div className="flex flex-col gap-5 min-w-0">
              <div>
                <h2
                  className="text-lg font-bold"
                  style={{ color: 'var(--color-carbono)' }}
                >
                  {selected.name}
                </h2>
                <p className="mt-0.5 text-sm" style={{ color: 'var(--color-carbono-claro)' }}>
                  {selected.description}
                </p>
              </div>

              <div>
                <div className="mb-2 flex items-center gap-2">
                  <span
                    className="text-xs font-semibold uppercase tracking-widest"
                    style={{ color: 'var(--color-verde-600)' }}
                  >
                    Instalación
                  </span>
                  <div className="h-px flex-1" style={{ background: 'color-mix(in oklch, var(--color-verde-300) 30%, transparent)' }} />
                </div>
                <InstallCommand command={selected.installCommand} />
              </div>

              <div>
                <div className="mb-2 flex items-center gap-2">
                  <span
                    className="text-xs font-semibold uppercase tracking-widest"
                    style={{ color: 'var(--color-verde-600)' }}
                  >
                    Código
                  </span>
                  <div className="h-px flex-1" style={{ background: 'color-mix(in oklch, var(--color-verde-300) 30%, transparent)' }} />
                </div>
                <CodeBlock snippet={selected} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* footer */}
      <footer className="mt-12 pb-4 text-center">
        <p className="text-[11px]" style={{ color: 'var(--color-carbono-claro)' }}>
          SnippetBox · snippets para tu día a día
        </p>
      </footer>
    </div>
  )
}
