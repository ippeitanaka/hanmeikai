// テキスト内のURLを自動リンク化し、改行を<br>に変換する関数
export function formatTextWithLinks(text: string): JSX.Element[] {
  // URL検出用の正規表現
  const urlRegex = /(https?:\/\/[\w\-._~:/?#[\]@!$&'()*+,;=%]+)|(www\.[\w\-._~:/?#[\]@!$&'()*+,;=%]+)/gi;
  // 改行で分割し、各行ごとに処理
  return text.split(/(\n|\r\n?)/).map((line, i) => {
    if (line.match(/\n|\r\n?/)) {
      return <br key={`br-${i}`} />;
    }
    const parts = [];
    let lastIndex = 0;
    let match;
    while ((match = urlRegex.exec(line)) !== null) {
      if (match.index > lastIndex) {
        parts.push(line.substring(lastIndex, match.index));
      }
      let url = match[0];
      if (!/^https?:\/\//i.test(url)) {
        url = 'http://' + url;
      }
      parts.push(
        <a
          key={`url-${i}-${match.index}`}
          href={url}
          className="underline text-blue-400 hover:text-blue-200 break-all"
          target="_blank"
          rel="noopener noreferrer"
        >
          {match[0]}
        </a>
      );
      lastIndex = match.index + match[0].length;
    }
    if (lastIndex < line.length) {
      parts.push(line.substring(lastIndex));
    }
    return <span key={`line-${i}`}>{parts}</span>;
  });
}
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
