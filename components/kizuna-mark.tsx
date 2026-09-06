type KizunaMarkProps = {
  className?: string
  title?: string
}

export default function KizunaMark({ className = "h-10 w-10", title = "絆命会" }: KizunaMarkProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label={title}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="32" cy="32" r="29" fill="currentColor" opacity="0.1" />
      <circle cx="32" cy="32" r="25" stroke="currentColor" strokeWidth="2.5" opacity="0.35" />
      <path
        d="M23 17V47M23 32L41 18M23 32L42 47"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M38.5 29.5H44L47 24L51 37L54 31H58"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="23" cy="17" r="2.8" fill="currentColor" />
      <circle cx="23" cy="47" r="2.8" fill="currentColor" />
      <circle cx="42" cy="47" r="2.8" fill="currentColor" />
    </svg>
  )
}
