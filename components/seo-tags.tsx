"use client"

type SeoTagsProps = {
  googleSiteVerification?: string
}

export function SeoTags({ googleSiteVerification }: SeoTagsProps) {
  return (
    <>
      {googleSiteVerification ? (
        <meta name="google-site-verification" content={googleSiteVerification} />
      ) : null}
    </>
  )
}

export default SeoTags
