import { renderToPipeableStream } from 'react-dom/server'
import { Router } from './router'
import type { Response } from 'express'

export function render(
  url: string,
  template: string,
  res: Response
): Promise<void> {
  return new Promise((resolve, reject) => {
    const { pipe } = renderToPipeableStream(<Router url={url} />, {
      onShellReady() {
        const htmlStart = template.split('<!--app-html-->')[0]
        res.write(htmlStart)
        pipe(res)
      },
      onShellError(error) {
        reject(error)
      },
      onAllReady() {
        const htmlEnd = template.split('<!--app-html-->')[1]
        if (htmlEnd) res.end(htmlEnd)
        resolve()
      },
      onError(error) {
        console.error('SSR error:', error)
      },
    })
  })
}
