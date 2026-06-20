# SnippetBox

Herramienta para organizar snippets tecnologicos de Node.js/NestJS. Busca por tecnologia, visualiza el comando de instalacion y el codigo boilerplate con sintaxis resaltada.

## Stack

| Categoria | Libreria |
|---|---|
| Framework | React 19 + TypeScript 5.6 |
| Build | Vite 6 + tailwindcss/vite |
| Estilos | Tailwind CSS v4 + CSS variables + diseno propio |
| Sintaxis | Prism.js |
| Iconos | lucide-react |
| Utilidades | clsx + tailwind-merge |

## Requisitos

- Node.js >= 18
- npm >= 9

## Instalacion

```bash
cd snippetbox
npm install
```

## Desarrollo

```bash
npm run dev
```

Abre `http://localhost:5173` en el navegador. El servidor recarga automaticamente al editar archivos.

## Build

```bash
npm run build
```

Genera la carpeta `dist/` lista para desplegar en cualquier hosting estatico (Vercel, Cloudflare Pages, Netlify).

## Preview del build

```bash
npm run preview
```

## Estructura del proyecto

```
src/
├── main.tsx                       # Entry point
├── App.tsx                        # Componente raiz
├── index.css                      # Tailwind v4 + diseno propio
├── lib/
│   └── utils.ts                   # cn() helper (clsx + tailwind-merge)
├── types/
│   └── index.ts                   # Interfaces del dominio (Snippet, SnippetCollection)
├── data/
│   └── snippets.json              # Base de conocimiento tecnologica
├── components/
│   ├── ui/                        # Componentes base de diseno propio
│   │   ├── SearchInput.tsx        # Buscador con icono y boton limpiar
│   │   ├── CodeBlock.tsx          # Bloque de codigo con Prism.js y copia al portapapeles
│   │   └── InstallCommand.tsx     # Comando de terminal copiable
│   └── feedback/
│       └── EmptyState.tsx         # Estado vacio reutilizable
└── features/
    └── snippets/                  # Feature de snippets
        ├── components/
        │   └── TechnologyList.tsx  # Lista de tecnologias con logo, tooltip y seleccion
        └── pages/
            └── SnippetsPage.tsx   # Pagina principal con busqueda y detalle
```

## Como anadir una nueva tecnologia

Abre `src/data/snippets.json` y agrega una entrada al array `technologies` con esta estructura:

```json
{
  "id": "nombre-kebab",
  "name": "Nombre",
  "category": "Categoria",
  "description": "Descripcion breve y util",
  "installCommand": "comando de instalacion",
  "language": "typescript",
  "logoSrc": "https://cdn.simpleicons.org/nombre/16a34a",
  "code": "codigo boilerplate aqui"
}
```

- `id`: identificador unico en kebab-case
- `name`: nombre visible de la tecnologia
- `category`: agrupacion (ORM, Framework, Testing, etc.)
- `description`: texto informativo que aparece en la lista y en el detalle
- `installCommand`: comando para instalar la dependencia
- `language`: lenguaje para Prism.js (typescript, javascript, json, yaml)
- `logoSrc`: (opcional) URL del logo via simpleicons.org. Si se omite, se muestra la inicial.
- `code`: bloque de codigo boilerplate que se mostrara con sintaxis resaltada

## Personalizar estilos

Los colores y sombras se definen como variables CSS en `src/index.css`. La paleta usa OKLCH y esta centrada en tonos verdes y blancos:

- `--color-verde-*` : escala de verde principal
- `--color-blanco-puro` / `--color-blanco-humo` : fondos
- `--color-carbono` / `--color-carbono-claro` : texto
- `--shadow-*` : sistema de sombras propio
- `--radius-*` : sistema de bordes redondeados

## Notas

- No requiere backend ni base de datos. Los datos se cargan desde el JSON local.
- No usa .env, la aplicacion es 100% auto-contenida.
- Los logos se cargan desde el CDN de simpleicons.org. Puedes descargarlos y servirlos localmente si prefieres funcionar offline.
- Sigue la skill SKILL_WEB_SAAS: componentes originales, sin shadcn/ui, sin librerias de componentes predefinidos.
