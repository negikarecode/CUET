/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F8FAFC",
        foreground: "#0F172A",
        subject: {
          physics: {
            DEFAULT: "#3B82F6",
            light: "#EFF6FF",
            dark: "#1D4ED8",
          },
          chemistry: {
            DEFAULT: "#F97316",
            light: "#FFF7ED",
            dark: "#C2410C",
          },
          maths: {
            DEFAULT: "#10B981",
            light: "#ECFDF5",
            dark: "#047857",
          },
          english: {
            DEFAULT: "#8B5CF6",
            light: "#F5F3FF",
            dark: "#6D28D9",
          },
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        card: "0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.04)",
        hover: "0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.04)",
        dropdown: "0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -4px rgba(0, 0, 0, 0.04)",
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      }
    },
  },
  plugins: [],
}
