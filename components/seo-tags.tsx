"use client"
import Script from "next/script"

type SeoTagsProps = {
  gaId?: string
  googleSiteVerification?: string
}

export function SeoTags({ gaId, googleSiteVerification }: SeoTagsProps) {
  return (
    <>
      {googleSiteVerification ? (
        <meta name="google-site-verification" content={googleSiteVerification} />
      ) : null}
      {gaId ? (
        <>
          {/* Google tag (gtag.js) */}
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);} 
              gtag('js', new Date());
              gtag('config', '${gaId}');
            `}
          </Script>
        </>
      ) : null}
    </>
  )
}

export default SeoTags
