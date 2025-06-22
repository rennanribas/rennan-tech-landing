import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import { createServer as createViteServer } from 'vite'
import type { Request, Response, NextFunction } from 'express'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function createServer() {
  const app = express()

  // Vite SSR middleware
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom',
  })

  app.use(vite.middlewares)

  app.use('*', async (req: Request, res: Response, next: NextFunction) => {
    const url = req.originalUrl

    try {
      let template = fs.readFileSync(
        path.resolve(__dirname, 'index.html'),
        'utf-8'
      )

      template = await vite.transformIndexHtml(url, template)

      const { render } = await vite.ssrLoadModule('/src/entry-server.tsx')
      res.status(200).setHeader('Content-Type', 'text/html')

      // React 19 SSR Streaming (mais moderno)
      await render(url, template, res)
    } catch (e) {
      vite.ssrFixStacktrace(e as Error)
      next(e)
    }
  })

  const port = Number(process.env.PORT) || 5173
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
  })
}

createServer().catch((error) => {
  console.error('Failed to start server:', error)
  process.exit(1)
})
