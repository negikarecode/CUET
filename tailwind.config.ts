import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#FAF7EE",
        background: "#FAF7EE",
        surface: "#FFFFFF",
        ink: "#000000",
        border: "#000000",
        coral: {
          light: "#FFE5E5",
          DEFAULT: "#FF5C5C",
          dark: "#E03E3E",
          hover: "#FF4545",
        },
        mint: {
          light: "#D1FAE5",
          DEFAULT: "#10B981",
          dark: "#059669",
        },
        banana: {
          light: "#FEF3C7",
          DEFAULT: "#F59E0B",
          dark: "#D97706",
        },
        lavender: {
          light: "#EEF2FF",
          DEFAULT: "#6366F1",
          dark: "#4F46E5",
        },
        sky: {
          light: "#E0F2FE",
          DEFAULT: "#0EA5E9",
          dark: "#0284C7",
        },
        primary: {
          50: "#FFF5F5",
          100: "#FFE5E5",
          200: "#FECDD3",
          300: "#FDA4AF",
          400: "#FB7185",
          500: "#FF5C5C",
          600: "#E03E3E",
          700: "#BE123C",
          800: "#9F1239",
          900: "#121212",
          950: "#000000",
          DEFAULT: "#FF5C5C",
        },
        accent: {
          amber: {
            light: "#FEF3C7",
            DEFAULT: "#F59E0B",
            dark: "#D97706",
          },
          emerald: {
            light: "#D1FAE5",
            DEFAULT: "#10B981",
            dark: "#059669",
          },
        },
        danger: {
          light: "#FEE2E2",
          DEFAULT: "#EF4444",
          dark: "#DC2626",
        },
      },
      fontFamily: {
        sans: [
          "Plus Jakarta Sans",
          "Space Grotesk",
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        mono: [
          "Space Mono",
          "JetBrains Mono",
          "SFMono-Regular",
          "Menlo",
          "monospace",
        ],
      },
      boxShadow: {
        subtle: "2px 2px 0px 0px #000000",
        card: "4px 4px 0px 0px #000000",
        "elevation-high": "6px 6px 0px 0px #000000",
        "brutal-sm": "2px 2px 0px 0px #000000",
        "brutal": "4px 4px 0px 0px #000000",
        "brutal-lg": "6px 6px 0px 0px #000000",
        "brutal-xl": "8px 8px 0px 0px #000000",
      },
    },
  },
  plugins: [],
};

export default config;
