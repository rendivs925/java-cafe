import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "2rem",
        sm: "4rem",
        lg: "5rem",
        xl: "6rem",
        "2xl": "7rem",
      },
      screens: {
        xl: "1500px",
      },
    },
    extend: {
      gridTemplateColumns: {
        responsive: "repeat(auto-fit, minmax(235px, 1fr))",
        about: "1fr 1.8fr",
        hero: "1fr auto",
      },
      screens: {
        smallerMobileScreen: "400px",
      },

      colors: {
        primary: "#1C0A00",
        secondary: "#361500",
        accent: "#813e0a",
        heading: "#F8FAFC",
        body: "#bbbbbb",
        bodyBlur: "rgba(255, 255, 255, .7)",
      },

      fontSize: {
        "2xs": "4px",
        xs: "8px",
        sm: "12px",
        base: "16px",
        md: "20px",
        lg: "24px",
        xl: "28px",
        "2xl": "32px",
        "3xl": "36px",
        "4xl": "40px",
        "5xl": "44px",
        "6xl": "48px",
        "7xl": "52px",
        "8xl": "56px",
      },
      spacing: {
        "2xs": "4px",
        xs: "8px",
        sm: "12px",
        base: "16px",
        md: "20px",
        lg: "24px",
        xl: "28px",
        "2xl": "32px",
        "3xl": "36px",
        "4xl": "40px",
        "5xl": "44px",
        "6xl": "48px",
        "7xl": "52px",
        "8xl": "56px",
        "9xl": "60px",
        "10xl": "64px",
        "11xl": "68px",
        "12xl": "72px",
        "13xl": "76px",
        "14xl": "80px",
      },
    },
  },
  plugins: [],
};
export default config;
