import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vite.dev/guide/ssr
export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths()],

  ssr: {
    noExternal: ['motion', 'react-icons', 'lucide-react'],
    target: 'node',
  },

  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          animations: ['motion'],
          icons: ['lucide-react', 'react-icons'],
        },
      },
    },
    sourcemap: true,
    manifest: true,
    ssrManifest: true,
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
    hmr: {
      port: 24678,
    },
  },

  preview: {
    port: 3000,
  },
})
