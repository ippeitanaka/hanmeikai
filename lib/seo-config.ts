export type SeoConfig = {
  googleSiteVerification: string | null
}

// アプリ（またはパス）ごとのSearch Console用content値をマッピング
// 必要に応じて値を埋めてください。
export const SEO_MAPPING: Record<string, Partial<SeoConfig>> = {
  // 例: "admin": { googleSiteVerification: "" },
  // 例: "public": { googleSiteVerification: "" },
}


export function getSeoConfig(appKey = "default"): SeoConfig {
  const base: SeoConfig = {
    googleSiteVerification: null,
  }
  const override = SEO_MAPPING[appKey] || {}
  return {
    googleSiteVerification: override.googleSiteVerification ?? base.googleSiteVerification,
  }
}
