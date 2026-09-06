import type React from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

type PublicPageHeaderProps = {
  eyebrow: string
  title: string
  description: string
  icon?: React.ReactNode
  backHref?: string
  backLabel?: string
}

export function PublicPageHeader({
  eyebrow,
  title,
  description,
  icon,
  backHref = "/",
  backLabel = "ホームに戻る",
}: PublicPageHeaderProps) {
  return (
    <section className="border-b border-slate-100 bg-gradient-to-b from-[#F6FBFA] to-white">
      <div className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 sm:py-16 lg:px-10">
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 transition hover:text-[#087C73]"
        >
          <ArrowLeft className="h-4 w-4" />
          {backLabel}
        </Link>

        <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3">
              {icon && (
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E7F7F4] text-[#0B9A82]">
                  {icon}
                </span>
              )}
              <p className="text-[11px] font-extrabold tracking-[0.25em] text-[#12A491]">{eyebrow}</p>
            </div>
            <h1 className="mt-4 text-4xl font-black tracking-[-0.03em] text-[#112B3A] sm:text-5xl">{title}</h1>
            <p className="mt-4 max-w-2xl text-base font-medium leading-8 text-slate-600">{description}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export function LoadingState({ label = "読み込んでいます..." }: { label?: string }) {
  return (
    <div className="flex min-h-[260px] flex-col items-center justify-center rounded-3xl border border-slate-200 bg-white shadow-[0_12px_35px_rgba(15,61,62,0.06)]">
      <span className="h-10 w-10 animate-spin rounded-full border-4 border-[#D8EFEB] border-t-[#0B9A82]" />
      <p className="mt-4 text-sm font-bold text-slate-500">{label}</p>
    </div>
  )
}

export function EmptyState({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description?: string
}) {
  return (
    <div className="rounded-3xl border border-dashed border-[#B9DDD7] bg-[#F7FBFA] px-6 py-16 text-center">
      <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#E7F7F4] text-[#0B9A82]">
        {icon}
      </span>
      <h2 className="mt-5 text-xl font-black text-[#112B3A]">{title}</h2>
      {description && <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>}
    </div>
  )
}
