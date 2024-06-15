import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./views/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/components/(avatar|button|dropdown|input|navbar|spinner|ripple|menu|divider|popover).js",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    nextui({
      themes: {
        "light-theme": {
          extend: "light",
          colors: {
            background: "#f9fafb",
            primary: {
              "50": "#f9fafb",
              "100": "#f3f4f6",
              "200": "#e5e7eb",
              "300": "#d1d5db",
              "400": "#9ca3af",
              "500": "#6b7280",
              "600": "#4b5563",
              "700": "#374151",
              "800": "#1f2937",
              "900": "#111827",
            },
          },
        },
      },
    }),
  ],
};
export default config;
