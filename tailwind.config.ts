import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        d8: {
          black: "#0a0a0a",
          darker: "#050505",
          surface: "#111111",
          "surface-hover": "#1a1a1a",
          green: "#00ff41",
          "green-dim": "rgba(0, 255, 65, 0.15)",
          text: "#ededed",
          muted: "rgba(237, 237, 237, 0.55)",
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', "ui-sans-serif", "system-ui", "sans-serif"],
        body: ['"Space Grotesk"', "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
