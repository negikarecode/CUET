import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        brand: {
          DEFAULT: "#6366f1",
          50: "#eef2ff",
          100: "#e0e7ff",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
        },
        critical: {
          DEFAULT: "#dc2626",
          bg: "#fef2f2",
          border: "#fecaca",
          text: "#b91c1c",
        },
        weak: {
          DEFAULT: "#ea580c",
          bg: "#fff7ed",
          border: "#fed7aa",
          text: "#c2410c",
        },
        average: {
          DEFAULT: "#ca8a04",
          bg: "#fefce8",
          border: "#fef08a",
          text: "#a16207",
        },
        strong: {
          DEFAULT: "#16a34a",
          bg: "#f0fdf4",
          border: "#bbf7d0",
          text: "#15803d",
        },
        excellent: {
          DEFAULT: "#059669",
          bg: "#ecfdf5",
          border: "#a7f3d0",
          text: "#047857",
        },
        untested: {
          DEFAULT: "#6b7280",
          bg: "#f9fafb",
          border: "#e5e7eb",
          text: "#4b5563",
        },
      },
      borderRadius: {
        lg: "12px",
        md: "8px",
        sm: "6px",
      },
    },
  },
  plugins: [],
};

export default config;
