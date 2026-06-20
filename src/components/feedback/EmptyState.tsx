interface EmptyStateProps {
  message: string
}

export function EmptyState({ message }: EmptyStateProps) {
  return (
    <div
      className="flex flex-col items-center justify-center rounded-xl py-16"
      style={{ background: 'var(--color-blanco-puro)' }}
    >
      <span className="text-4xl opacity-30">--</span>
      <p className="mt-3 text-sm" style={{ color: 'var(--color-carbono-claro)' }}>
        {message}
      </p>
    </div>
  )
}
