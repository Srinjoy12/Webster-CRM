import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(20, 5.9%, 90%)",
        input: "hsl(20, 5.9%, 90%)",
        ring: "hsl(20, 14.3%, 4.1%)",
        background: "hsl(42, 33%, 97%)", // Landing page background
        foreground: "hsl(20, 14.3%, 4.1%)", // Landing page foreground
        primary: {
          DEFAULT: "hsl(24, 9.8%, 10%)",
          foreground: "hsl(60, 9.1%, 97.8%)",
        },
        secondary: {
          DEFAULT: "hsl(60, 4.8%, 95.9%)",
          foreground: "hsl(24, 9.8%, 10%)",
        },
        destructive: {
          DEFAULT: "hsl(0, 84.2%, 60.2%)",
          foreground: "hsl(60, 9.1%, 97.8%)",
        },
        muted: {
          DEFAULT: "hsl(60, 4.8%, 95.9%)",
          foreground: "hsl(25, 5.3%, 44.7%)",
        },
        accent: {
          DEFAULT: "hsl(60, 4.8%, 95.9%)",
          foreground: "hsl(24, 9.8%, 10%)",
        },
        popover: {
          DEFAULT: "hsl(0, 0%, 100%)",
          foreground: "hsl(20, 14.3%, 4.1%)",
        },
        card: {
          DEFAULT: "hsl(0, 0%, 100%)",
          foreground: "hsl(20, 14.3%, 4.1%)",
        },
      },
      borderRadius: {
        lg: "var(--radius)", // Assuming --radius is 0.5rem for lg
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("tailwindcss-animate")], // Added tailwindcss-animate
};
export default config; 