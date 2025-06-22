# Rennan Tech - SSR Portfolio

Modern portfolio website built with the latest React 19.1, Vite 6, React Router 7, and Tailwind 4 patterns with Server-Side Rendering (SSR).

## 🚀 Technology Stack

### Core Framework

- **React 19.1** - Latest stable release with Actions, useActionState, and Server Components
- **TypeScript 5.8** - Full type safety throughout the application
- **Vite 6** - Modern build tool with native SSR support

### Routing & State

- **React Router 7** - Unified package with framework-mode capabilities
- **React 19.1 Actions** - Modern form handling with `useActionState`
- **React 19.1 Hooks** - `useFormStatus`, `useOptimistic` for enhanced UX

### Styling & UI

- **Tailwind CSS 4** - CSS-first configuration with modern features
- **Motion** - Smooth animations and transitions
- **Lucide React** - Modern icon system

### SSR & Production

- **Express 5** - Production server with SSR middleware
- **Sirv** - Static file serving for production
- **Cross-env** - Environment variable management

## 🏗️ Architecture

### SSR Entry Points

```
src/entry-client.tsx  # Client-side hydration
src/entry-server.tsx  # Server-side rendering
server.js            # Express SSR server
```

### Modern React 19.1 Patterns

- ✅ Actions for form handling (`useActionState`)
- ✅ Ref as prop (no more `forwardRef` needed)
- ✅ Context as provider (no `.Provider` wrapper)
- ✅ Enhanced error boundaries and hydration
- ✅ Server Components ready architecture

### Tailwind 4 Features

- ✅ CSS-first configuration using `@theme`
- ✅ Modern color system with OKLCH
- ✅ Built-in container queries
- ✅ Cascade layers for better specificity
- ✅ Dynamic utility values

## 🛠️ Development

### Prerequisites

- Node.js 18+ (recommended: 20+)
- pnpm (recommended) or npm

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

The development server runs at `http://localhost:3000` with:

- Hot Module Replacement (HMR)
- SSR in development
- TypeScript checking
- Tailwind 4 CSS processing

### Available Scripts

```bash
pnpm dev        # Start development server with SSR
pnpm build      # Build for production (client + server)
pnpm preview    # Preview production build
pnpm start      # Start production server
pnpm lint       # Run ESLinter
```

## 🚀 Production Deployment

### Build Process

```bash
# Build both client and server bundles
pnpm build

# This creates:
# dist/client/  - Static assets and client bundle
# dist/server/  - SSR server bundle
```

### Production Server

```bash
# Start production server
NODE_ENV=production node server.js

# Or with PM2
pm2 start server.js --name "rennan-tech"
```

## 🎨 Key Features

### Modern React 19.1 Implementation

- **Form Actions**: Contact form uses `useActionState` for progressive enhancement
- **Optimistic Updates**: Immediate UI feedback with server validation
- **Enhanced Error Handling**: Better hydration error reporting
- **Server Components**: Architecture ready for RSC adoption

### Performance Optimizations

- **SSR**: Faster initial page loads and better SEO
- **Code Splitting**: Automatic bundle splitting by route and library
- **Preload Directives**: Critical resource preloading
- **Modern CSS**: Tailwind 4's faster build system

### Developer Experience

- **TypeScript**: Full type safety with latest React 19.1 types
- **Hot Reloading**: Instant updates during development
- **ESLint**: Code quality and consistency
- **Modern Tooling**: Latest versions of all dependencies

## 📁 Project Structure

```
src/
├── actions/           # React 19.1 Actions for data mutations
├── components/        # Reusable UI components
├── hooks/            # Custom React hooks
├── pages/            # Route components
├── sections/         # Page sections
├── types/            # TypeScript type definitions
├── entry-client.tsx  # Client hydration entry
├── entry-server.tsx  # SSR entry point
├── router.tsx        # React Router 7 configuration
└── index.css         # Tailwind 4 styles

dist/
├── client/           # Client build output
└── server/           # SSR build output
```

## 🔧 Configuration

### Vite 6 SSR

- Middleware mode for development
- SSR manifest generation
- Optimized dependency handling

### React Router 7

- Memory router for SSR
- Browser router for client
- Type-safe route definitions

### Tailwind 4

- CSS-first configuration
- Modern color system
- Container queries
- Dynamic utilities

## 📈 Migration Benefits

### From SPA to SSR

- ⚡ **Better SEO**: Search engines can crawl content
- 🚀 **Faster FCP**: Content visible before JS loads
- 📱 **Better UX**: Works without JavaScript
- 🎯 **Core Web Vitals**: Improved performance metrics

### React 19.1 Advantages

- 🔄 **Simplified Forms**: Actions replace complex state management
- ⚡ **Better Performance**: Optimized rendering and hydration
- 🛠️ **Developer Experience**: Less boilerplate, more features
- 🔮 **Future Ready**: Prepared for Server Components

### Modern Stack Benefits

- 🏗️ **Vite 6**: Faster builds and better HMR
- 🎨 **Tailwind 4**: 5x faster CSS processing
- 🔀 **Router 7**: Unified API and better TypeScript support
- 📦 **Latest Ecosystem**: Cutting-edge features and optimizations

## 🤝 Contributing

This project follows modern React 19.1 patterns and TypeScript best practices. When contributing:

1. Use React 19.1 features (Actions, new hooks)
2. Maintain SSR compatibility
3. Follow Tailwind 4 CSS-first patterns
4. Ensure TypeScript strict mode compliance

---

Built with ❤️ using the latest React 19.1, Vite 6, Router 7, and Tailwind 4 patterns.
