import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        paper: "#FFFFFF",
        ink: "#252B26",
        moss: "#2D6A4F",
        mossDark: "#1B4332",
        clay: "#B44A1F",
        sand: "#DEDFD5",
        mist: "#F3F6F4",
      },
      fontFamily: {
        sans: ["var(--font-source-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-source-sans)", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
