"use client"

export default function FallbackBackground() {
  return (
    <>
      {/* フォールバック背景画像 */}
      <div className="fixed inset-0 w-full h-full z-0">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: "url('/images/japan-map-wave.png')",
            filter: "brightness(0.85) contrast(0.9)",
          }}
        ></div>

        {/* Background overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-stone-100/30 via-amber-50/20 to-stone-200/30"></div>
      </div>

      {/* Subtle Pattern Overlay */}
      <div className="absolute inset-0 opacity-2 z-1">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #059669 1px, transparent 1px),
                           radial-gradient(circle at 75% 75%, #d97706 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
      </div>
    </>
  )
}
