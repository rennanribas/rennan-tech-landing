import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

type Props = {
  title?: string;
  description?: string;
  imageUrl?: string;
  domain?: string;
  url?: string;
  author?: string;
  keywords?: string;
};

/** Professional SEO head component following 2025 best practices for PWA and modern web development. */
export function SeoHead({ 
  title = "Rennan Ribas - Senior Software Engineer", 
  description = "Senior Software Engineer with 10+ years delivering scalable, cloud-native applications. Expert in TypeScript, React, NestJS, and cloud architecture.", 
  imageUrl = "/icons/icon-512.png", 
  domain = "rennanribas.tech",
  url = "https://rennanribas.tech",
  author = "Rennan Ribas",
  keywords = "Software Engineer, TypeScript, React, NestJS, Cloud Architecture, Full Stack Developer"
}: Props) {
  return (
    <HelmetProvider>
      <Helmet>
        {/* Essential Meta Tags */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <meta name="robots" content="index, follow" />
        <meta name="color-scheme" content="light dark" />
        <meta name="format-detection" content="telephone=no" />
        
        {/* Favicon and Icons - 2025 Best Practices */}
        <link rel="icon" href="/icons/favicon.ico" sizes="32x32" />
        <link rel="icon" type="image/svg+xml" href="/icons/icon.svg" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/icon-16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/icon-32.png" />
        <link rel="icon" type="image/png" sizes="48x48" href="/icons/icon-48.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icons/icon-192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icons/icon-512.png" />
        
        {/* Apple Touch Icons */}
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
        <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#0ea5e9" />
        
        {/* PWA Manifest */}
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Theme Colors */}
        <meta name="theme-color" content="#0ea5e9" />
        <meta name="msapplication-TileColor" content="#0ea5e9" />
        <meta name="msapplication-TileImage" content="/icons/icon-256.png" />
        
        {/* iOS Safari */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Rennan Ribas" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={`${url}${imageUrl}`} />
        <meta property="og:image:width" content="512" />
        <meta property="og:image:height" content="512" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:site_name" content="Rennan Ribas" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={url} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={`${url}${imageUrl}`} />
        <meta name="twitter:creator" content="@rennanribas" />
        
        {/* Canonical URL */}
        <link rel="canonical" href={url} />
        
        {/* DNS Prefetch for Performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//plausible.io" />
        
        {/* Privacy-friendly Analytics */}
        {domain && (
          <script defer data-domain={domain} src="https://plausible.io/js/script.js"></script>
        )}
      </Helmet>
    </HelmetProvider>
  );
}
