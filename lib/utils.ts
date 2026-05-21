import { createElement, type ReactNode } from "react"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTextWithLinks(text: string): ReactNode[] {
  if (!text) {
    return []
  }

  const urlRegex = /(https?:\/\/[\w!?/\-._~:@&=+$,%#]+)|(www\.[\w!?/\-._~:@&=+$,%#]+)/g

  return text.split(/\n/).flatMap((line, lineIndex, lines) => {
    const parts: ReactNode[] = []
    let lastIndex = 0
    let match: RegExpExecArray | null

    while ((match = urlRegex.exec(line)) !== null) {
      if (match.index > lastIndex) {
        parts.push(line.slice(lastIndex, match.index))
      }

      const url = match[0]
      const href = url.startsWith("http") ? url : `https://${url}`

      parts.push(
        createElement(
          "a",
          {
            key: `${href}-${lineIndex}`,
            href,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "underline text-kizuna-gold hover:text-kizuna-bronze",
          },
          url,
        ),
      )

      lastIndex = match.index + url.length
    }

    if (lastIndex < line.length) {
      parts.push(line.slice(lastIndex))
    }

    if (lineIndex < lines.length - 1) {
      parts.push(createElement("br", { key: `br-${lineIndex}` }))
    }

    return parts
  })
}

