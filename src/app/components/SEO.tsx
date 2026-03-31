import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title?: string
  description?: string
  image?: string
  url?: string
}

const SITE_NAME = 'GLG Costruzioni'
const DEFAULT_DESCRIPTION = 'Impresa edile a Concorezzo, Lombardia. Specializzati in costruzioni residenziali, commerciali, ristrutturazioni e trattamenti Tecnored per impermeabilizzazione.'
const DEFAULT_IMAGE = 'https://glg-costruzioni.vercel.app/og-image.jpg'
const BASE_URL = 'https://glg-costruzioni.vercel.app'

export function SEO({ title, description, image, url }: SEOProps) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME
  const metaDescription = description || DEFAULT_DESCRIPTION
  const metaImage = image || DEFAULT_IMAGE
  const metaUrl = url ? `${BASE_URL}${url}` : BASE_URL

  return (
    <Helmet>
      {/* Base */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={metaUrl} />

      {/* Open Graph (Facebook, LinkedIn, WhatsApp) */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:url" content={metaUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="it_IT" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />

      {/* Extra */}
      <meta name="robots" content="noindex, nofollow" />
      <meta name="author" content={SITE_NAME} />
      <meta name="geo.region" content="IT-MB" />
      <meta name="geo.placename" content="Concorezzo" />
    </Helmet>
  )
}