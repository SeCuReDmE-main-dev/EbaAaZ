import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: '#1E1E1E',  /* Dark Grey */
  			foreground: '#FFFFFF',  /* White */
  			card: {
  				DEFAULT: '#333333',  /* Darker Grey */
  				foreground: '#FFFFFF'   /* White */
  			},
  			popover: {
  				DEFAULT: '#333333',  /* Darker Grey */
  				foreground: '#FFFFFF'   /* White */
  			},
  			primary: {
  				DEFAULT: '#FF8C00',  /* Dark Orange */
  				foreground: '#FFFFFF'   /* White */
  			},
  			secondary: {
  				DEFAULT: '#555555',  /* Medium Grey */
  				foreground: '#FFFFFF'   /* White */
  			},
  			muted: {
  				DEFAULT: '#555555',  /* Medium Grey */
  				foreground: '#FFFFFF'   /* White */
  			},
  			accent: {
  				DEFAULT: '#777777',  /* Light Grey */
  				foreground: '#FFFFFF'   /* White */
  			},
  			destructive: {
  				DEFAULT: '#C0392B',
  				foreground: '#FFFFFF'
  			},
  			border: '#555555',  /* Medium Grey */
  			input: '#333333',  /* Darker Grey */
  			ring: '#FF8C00',  /* Dark Orange */
  			chart: {
  				'1': '#3498DB',
  				'2': '#E74C3C',
  				'3': '#F39C12',
  				'4': '#1ABC9C',
  				'5': '#9B59B6'
  			},
  			sidebar: {
  				DEFAULT: '#333333',  /* Darker Grey */
  				foreground: '#FFFFFF',   /* White */
  				primary: '#FF8C00',  /* Dark Orange */
  				'primary-foreground': '#FFFFFF',   /* White */
  				accent: '#444444',  /* Slightly Lighter Dark Grey */
  				'accent-foreground': '#FFFFFF',   /* White */
  				border: '#444444',  /* Slightly Lighter Dark Grey */
  				ring: '#FF8C00'  /* Dark Orange */
  			}
  		},
  		borderRadius: {
  			lg: '0.5rem',
  			md: 'calc(0.5rem - 2px)',
  			sm: 'calc(0.5rem - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
