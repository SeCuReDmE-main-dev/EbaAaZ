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
  			background: '#0D1117',
  			foreground: '#C9D1D9',
  			card: {
  				DEFAULT: '#2C3E50',
  				foreground: '#ECF0F1'
  			},
  			popover: {
  				DEFAULT: '#2C3E50',
  				foreground: '#ECF0F1'
  			},
  			primary: {
  				DEFAULT: '#3498DB',
  				foreground: '#FFFFFF'
  			},
  			secondary: {
  				DEFAULT: '#ECF0F1',
  				foreground: '#2C3E50'
  			},
  			muted: {
  				DEFAULT: '#ECF0F1',
  				foreground: '#2C3E50'
  			},
  			accent: {
  				DEFAULT: '#3498DB',
  				foreground: '#FFFFFF'
  			},
  			destructive: {
  				DEFAULT: '#C0392B',
  				foreground: '#FFFFFF'
  			},
  			border: '#2C3E50',
  			input: '#2C3E50',
  			ring: '#3498DB',
  			chart: {
  				'1': '#3498DB',
  				'2': '#E74C3C',
  				'3': '#F39C12',
  				'4': '#1ABC9C',
  				'5': '#9B59B6'
  			},
  			sidebar: {
  				DEFAULT: '#2C3E50',
  				foreground: '#ECF0F1',
  				primary: '#3498DB',
  				'primary-foreground': '#FFFFFF',
  				accent: '#34495E',
  				'accent-foreground': '#ECF0F1',
  				border: '#34495E',
  				ring: '#3498DB'
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
