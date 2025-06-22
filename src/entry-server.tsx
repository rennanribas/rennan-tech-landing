import { renderToString } from 'react-dom/server'
import { Router } from './router'

/**
 * Server-side rendering function following React 19.1 patterns
 * @param url - The request URL for routing
 * @returns Rendered HTML string
 */
export function render(url: string): string {
  try {
    // Render the React app to HTML string using React 19.1 SSR
    const html = renderToString(<Router url={url} />)
    return html
  } catch (error) {
    console.error('SSR rendering error:', error)
    // Return fallback HTML in case of error
    return '<div>Error rendering page</div>'
  }
}
