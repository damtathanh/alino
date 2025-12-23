/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Neutrals
        bg: "#FFFFFF",
        bgAlt: "#FAFAFA",
        surface: "#F2F4F7",
        border: "#E4E7EC",

        // Text
        primary: "#101828",
        secondary: "#667085",
        muted: "#98A2B3",

        // Brand Indigo
        brand: "#4F46E5",
        brandHover: "#4338CA",
        brandActive: "#3730A3",
        brandSoft: "#EEF2FF",

        // Semantic
        success: "#16A34A",
        warning: "#F59E0B",
        error: "#DC2626",
        info: "#2563EB",

        // Deal status
        dealNew: "#EEF2FF",
        dealProgress: "#DBEAFE",
        dealFeedback: "#FEF3C7",
        dealDone: "#DCFCE7",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(16,24,40,0.04)",
        card: "0 4px 12px rgba(16,24,40,0.08)",
        lift: "0 12px 24px rgba(16,24,40,0.12)",
      },
      borderRadius: {
        lg: "12px",
        xl: "16px",
      },
    },
  },
  plugins: [],
};
