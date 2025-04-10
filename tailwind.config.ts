import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "475px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      /* ------------------------------------------
         GLOBAL FONTS
      ------------------------------------------ */
      fontFamily: {
        inter: ['var(--font-inter)'],
        jost: ['var(--font-jost)'],
        poppins: ['var(--font-poppins)'],
      },

      /* ------------------------------------------
         COLOR VARIABLES
      ------------------------------------------ */
      colors: {
        // Base
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        // Primary & Secondary
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },

        // Destructive / Muted / Accent
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },

        // Popover & Card
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        // Success / Warning / Info
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
        info: {
          DEFAULT: "hsl(var(--info))",
          foreground: "hsl(var(--info-foreground))",
        },

        /* --------------------------------------
           NEWS / MAGAZINE CATEGORY COLORS
           (Customize as you like)
        -------------------------------------- */
        catPolitics: {
          DEFAULT: "hsl(var(--cat-politics))",
          foreground: "hsl(var(--cat-politics-foreground))",
        },
        catSports: {
          DEFAULT: "hsl(var(--cat-sports))",
          foreground: "hsl(var(--cat-sports-foreground))",
        },
        catEntertainment: {
          DEFAULT: "hsl(var(--cat-entertainment))",
          foreground: "hsl(var(--cat-entertainment-foreground))",
        },
        catTech: {
          DEFAULT: "hsl(var(--cat-tech))",
          foreground: "hsl(var(--cat-tech-foreground))",
        },
        catLifestyle: {
          DEFAULT: "hsl(var(--cat-lifestyle))",
          foreground: "hsl(var(--cat-lifestyle-foreground))",
        },
        catBusiness: {
          DEFAULT: "hsl(var(--cat-business))",
          foreground: "hsl(var(--cat-business-foreground))",
        },
      },

      /* ------------------------------------------
         BORDER RADIUS
      ------------------------------------------ */
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },

      /* ------------------------------------------
         KEYFRAMES & ANIMATIONS
      ------------------------------------------ */
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
} satisfies Config;
