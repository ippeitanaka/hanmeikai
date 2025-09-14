import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        makinas: [
          "マキナスsquare",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Hiragino Kaku Gothic ProN",
          "Hiragino Sans",
          "Meiryo",
          "sans-serif",
        ],
        sans: [
          "マキナスsquare",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Hiragino Kaku Gothic ProN",
          "Hiragino Sans",
          "Meiryo",
          "sans-serif",
        ],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // 絆命会ロゴベースのカラーパレット
        kizuna: {
          dark: "#000000",        // ブラック
          charcoal: "#1a1a1a",   // ダークグレー
          sage: "#333333",       // ミディアムグレー
          moss: "#666666",       // ライトグレー
          beige: "#D4C5A9",      // ロゴのベージュ
          gold: "#C8B99C",       // ロゴのゴールド
          "dark-gold": "#B8A082", // 濃いゴールド
          "bronze": "#A0906B",    // ブロンズ
          cream: "#E8E0D0",      // 明るいベージュ
          sand: "#F2EDE3",       // 最も明るいベージュ
        },
        // ダークモード対応
        darkGreen: {
          50: "#F2EDE3",
          100: "#E8E0D0", 
          200: "#D4C5A9",
          300: "#C8B99C",
          400: "#A89A7E",
          500: "#8B7D61",
          600: "#7A8B7B",
          700: "#5C6E5D",
          800: "#3A4A3B",
          900: "#2C3E2D",
          950: "#1E2B1F",
        },
        warmBeige: {
          50: "#FEFCF9",
          100: "#F9F6F0",
          200: "#F2EDE3",
          300: "#E8E0D0",
          400: "#D4C5A9",
          500: "#C8B99C",
          600: "#B5A485",
          700: "#9B8A6B",
          800: "#7D6F56",
          900: "#655946",
          950: "#4A3F33",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
