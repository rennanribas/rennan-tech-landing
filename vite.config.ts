import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths()],

  ssr: {
    noExternal: ['motion', 'react-icons', 'lucide-react'],
  },

  build: {
    ssrManifest: true,
    manifest: true,
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          icons: ['lucide-react', 'react-icons'],
          animation: ['motion'],
        },
      },
    },
  },

  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'motion',
      'lucide-react',
    ],
  },

  server: {
    middlewareMode: false,
    hmr: { port: 24678 },
  },
  preview: {
    port: 3000,
  },
})
