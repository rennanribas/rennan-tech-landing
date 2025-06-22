# Rennan Tech

Professional portfolio website built with React 19.1, Vite 6, React Router 7, and Tailwind 4 featuring Server-Side Rendering.

## Technology Stack

### Core Framework

- **React 19.1** - Actions, useActionState, and enhanced SSR capabilities
- **TypeScript 5.8** - Full type safety with strict configuration
- **Vite 6** - Native SSR support with middleware mode

### Routing & State Management

- **React Router 7** - Unified package with framework-mode capabilities
- **React 19.1 Actions** - Form handling with `useActionState`
- **React Hooks** - `useFormStatus`, `useOptimistic` for enhanced UX

### Styling & Animations

- **Tailwind CSS 4** - CSS-first configuration
- **Motion** - Smooth animations and micro-interactions
- **Lucide React** - Icon system

### SSR & Production

- **Express 5** - Production-ready server with Vite middleware
- **Native Vite SSR** - Official patterns from Vite documentation

## Architecture

### SSR Implementation

Following official Vite 6 SSR patterns from `https://vite.dev/guide/ssr`:

```
src/
├── entry-client.tsx  # Client-side hydration
├── entry-server.tsx  # Server-side rendering
└── router.tsx        # React Router 7 configuration

server.js             # Express server with Vite middleware
```

### React 19.1 Features

- Actions for form handling (`useActionState`)
- Enhanced hydration with better error handling
- Ref as prop (no more `forwardRef`)
- Server Components ready architecture
- Optimistic updates for better UX

## Development

### Prerequisites

- **Node.js 18+** (recommended: 20+)
- **pnpm** (recommended) or npm

### Installation & Development

```bash
# Install dependencies
pnpm install

# Start development (SPA mode)
pnpm dev

# Start development with SSR
pnpm dev:ssr
```

### Available Scripts

```bash
# Development
pnpm dev          # Vite dev server (SPA mode)
pnpm dev:ssr      # Express server with SSR

# Production Build (Native Vite 6 commands)
pnpm build        # Build client + server
pnpm build:client # Build client only
pnpm build:server # Build server only

# Production
pnpm start        # Start production server
pnpm preview      # Preview production build
pnpm preview:ssr  # Preview SSR build

# Code Quality
pnpm lint         # ESLint
```

## Production Deployment

### Build Process

Uses native Vite 6 SSR commands:

```bash
# Build everything
pnpm build

# This runs:
# 1. vite build --outDir dist/client
# 2. vite build --ssr src/entry-server.tsx --outDir dist/server

# Creates:
dist/
├── client/    # Static assets + client bundle
└── server/    # SSR server bundle
```

### Production Server

```bash
# Start production server
NODE_ENV=production node server.js

# Or with PM2
pm2 start server.js --name "rennan-tech"
```

## Key Features

### Vite 6 SSR Implementation

- **Middleware Mode**: Vite server integration
- **SSR Manifest**: Preload directive generation
- **Development SSR**: Hot reloading with SSR
- **Production Ready**: Optimized builds

### React 19.1 Patterns

- **Form Actions**: Progressive enhancement with `useActionState`
- **Enhanced Hydration**: Better error handling and recovery
- **Type Safety**: Full TypeScript integration
- **Performance**: Optimized rendering and bundle splitting

### Developer Experience

- **Hot Module Replacement**: Instant updates
- **TypeScript**: Strict type checking
- **ESLint**: Code quality enforcement
- **Tooling**: Comprehensive development environment

## Project Structure

```
src/
├── actions/           # React 19.1 Actions
├── components/        # UI components
│   ├── about/         # About page components
│   ├── contact/       # Contact form components
│   └── tech-stack/    # Technology showcase
├── hooks/            # Custom React hooks
├── pages/            # Route components
├── sections/         # Page sections
├── types/            # TypeScript definitions
├── entry-client.tsx  # Client hydration
├── entry-server.tsx  # SSR rendering
├── router.tsx        # React Router 7 setup
└── index.css         # Tailwind 4 styles

server.js             # Express SSR server
vite.config.ts        # Vite 6 configuration
```

## Configuration

### Vite 6 SSR Setup

```typescript
// vite.config.ts - Official SSR patterns
export default defineConfig({
  ssr: {
    noExternal: ['motion', 'react-icons', 'lucide-react'],
    target: 'node',
  },
  build: {
    manifest: true,        # Preload directives
    ssrManifest: true,     # SSR optimization
  }
})
```

### React Router 7 SSR

```typescript
// router.tsx - Routing configuration
export function Router({ url }: { url?: string }) {
  const router = url
    ? createMemoryRouter(routes, { initialEntries: [url] })
    : createBrowserRouter(routes)

  return <RouterProvider router={router} />
}
```

## Performance Benefits

### SSR Advantages

- **Faster FCP**: Content visible before JavaScript
- **Better SEO**: Search engine crawlable content
- **Progressive Enhancement**: Works without JavaScript
- **Core Web Vitals**: Improved performance metrics

### Stack Benefits

- **Vite 6**: Native SSR with middleware mode
- **Tailwind 4**: Enhanced CSS processing
- **React 19.1**: Enhanced performance and developer experience
- **Router 7**: Unified API with improved TypeScript support

## Development Notes

### SSR vs SPA Development

- **`pnpm dev`**: Fast SPA development with HMR
- **`pnpm dev:ssr`**: Full SSR testing with Express server

### TypeScript Configuration

- Strict mode enabled
- Path mapping with `vite-tsconfig-paths`
- React 19.1 types included

### Tailwind 4 Features

- CSS-first configuration
- Enhanced color system (OKLCH)
- Container queries
- Dynamic utility values

## License

MIT License

---

Built with React 19.1, Vite 6, React Router 7, and Tailwind 4.
