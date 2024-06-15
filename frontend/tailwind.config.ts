import { nextui } from "@nextui-org/theme";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./views/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/(avatar|button|dropdown|input|navbar|spinner|ripple|menu|divider|popover).js"
  ],
  theme: {
    extend: {
      colors: {
        "theme-bg": "var(--background)",

        danger: {
          "theme-danger": "var(--theme-danger)",
        },
      },
    },
  },
  plugins: [nextui()],
};
export default config;
