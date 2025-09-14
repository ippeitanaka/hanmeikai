export type SeoConfig = {
  gaId: string | null
  googleSiteVerification: string | null
}

// アプリ（またはパス）ごとのSearch Console用content値をマッピング
// 必要に応じて値を埋めてください。
export const SEO_MAPPING: Record<string, Partial<SeoConfig>> = {
  // 例: "admin": { googleSiteVerification: "" },
  // 例: "public": { googleSiteVerification: "" },
}

export const DEFAULT_GA_ID = "G-3K0XSVMYL7"

export function getSeoConfig(appKey = "default"): SeoConfig {
  const base: SeoConfig = {
    gaId: DEFAULT_GA_ID,
    googleSiteVerification: null,
  }
  const override = SEO_MAPPING[appKey] || {}
  return {
    gaId: override.gaId ?? base.gaId,
    googleSiteVerification: override.googleSiteVerification ?? base.googleSiteVerification,
  }
}
