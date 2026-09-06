type IconProps = {
  className?: string
}

const common = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
}

export function CommunityIcon({ className = "h-8 w-8" }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <circle cx="24" cy="13" r="4.5" {...common} />
      <circle cx="13.5" cy="17" r="3.8" {...common} />
      <circle cx="34.5" cy="17" r="3.8" {...common} />
      <path d="M16.5 35c.6-6 3.6-9 7.5-9s6.9 3 7.5 9" {...common} />
      <path d="M6.5 35c.5-5 3-7.8 6.6-7.8 2.2 0 4 1 5.1 2.5" {...common} />
      <path d="M41.5 35c-.5-5-3-7.8-6.6-7.8-2.2 0-4 1-5.1 2.5" {...common} />
    </svg>
  )
}

export function BookIcon({ className = "h-8 w-8" }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path d="M24 12c-3.5-3.2-8.2-4.7-14-4.2v27.4c5.8-.5 10.5 1 14 4.2" {...common} />
      <path d="M24 12c3.5-3.2 8.2-4.7 14-4.2v27.4c-5.8-.5-10.5 1-14 4.2" {...common} />
      <path d="M24 12v27.4" {...common} />
    </svg>
  )
}

export function HandshakeIcon({ className = "h-8 w-8" }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path d="M7 18l8-7 7 5-8.5 10.5a4 4 0 0 0 5.8 5.4l4.2-3.8" {...common} />
      <path d="M41 18l-8-7-6.5 5-5.7-2.4" {...common} />
      <path d="M19.5 32.5l4 4a3 3 0 0 0 4.2 0" {...common} />
      <path d="M24.5 28.5l6.4 6.4a3 3 0 0 0 4.2-4.2l-6.5-6.5" {...common} />
      <path d="M34.5 30l1.4 1.4a3 3 0 0 0 4.2-4.2l-8.5-8.5" {...common} />
      <path d="M7 18l-3 3 8 9 3-3M41 18l3 3-7 8-3-3" {...common} />
    </svg>
  )
}

export function GrowthIcon({ className = "h-8 w-8" }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path d="M8 39V28h7v11M20.5 39V22h7v17M33 39V16h7v23" {...common} />
      <path d="M8 20l8-7 7 4 13-10" {...common} />
      <path d="M30 7h6v6" {...common} />
    </svg>
  )
}

export function MegaphoneIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path d="M8 22v8h7l16 7V15l-16 7H8z" {...common} />
      <path d="M15 30l2.5 8h6L21 31" {...common} />
      <path d="M36 20l5-3M36 26h6M36 32l5 3" {...common} />
    </svg>
  )
}

export function CalendarIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <rect x="8" y="11" width="32" height="29" rx="4" {...common} />
      <path d="M15 7v8M33 7v8M8 20h32" {...common} />
      <path d="M15 27h5M26 27h5M15 33h5M26 33h5" {...common} />
    </svg>
  )
}

export function BriefcaseIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <rect x="7" y="16" width="34" height="23" rx="4" {...common} />
      <path d="M17 16v-5h14v5M7 25h34M21 25v4h6v-4" {...common} />
    </svg>
  )
}

export function TargetIcon({ className = "h-8 w-8" }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <circle cx="22" cy="26" r="14" {...common} />
      <circle cx="22" cy="26" r="8" {...common} />
      <circle cx="22" cy="26" r="2.5" fill="currentColor" />
      <path d="M28 20l10-10M32 10h6v6" {...common} />
    </svg>
  )
}

export function ClipboardIcon({ className = "h-8 w-8" }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <rect x="10" y="9" width="28" height="32" rx="4" {...common} />
      <path d="M18 9V6h12v3M17 19h14M17 26h14M17 33h9" {...common} />
      <path d="M31 32l2.5 2.5L39 29" {...common} />
    </svg>
  )
}

export function GemIcon({ className = "h-8 w-8" }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path d="M8 17l7-9h18l7 9-16 23L8 17z" {...common} />
      <path d="M8 17h32M15 8l4 9 5-9 5 9 4-9M19 17l5 23 5-23" {...common} />
    </svg>
  )
}

export function UserPlusIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <circle cx="19" cy="15" r="6" {...common} />
      <path d="M8 38c.8-8 4.8-12 11-12s10.2 4 11 12" {...common} />
      <path d="M36 16v10M31 21h10" {...common} />
    </svg>
  )
}
