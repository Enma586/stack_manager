export interface Snippet {
  id: string
  name: string
  category: string
  description: string
  installCommand: string
  code: string
  language: string
  logoSrc?: string
}

export interface SnippetCollection {
  technologies: Snippet[]
}
