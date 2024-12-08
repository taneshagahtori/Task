/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: [
	  "./pages/**/*.{js,ts,jsx,tsx,mdx}",
	  "./components/**/*.{js,ts,jsx,tsx,mdx}",
	  "./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
	  extend: {
		colors: {
		  lightGray: "#f7f8fa", // Adjust as needed
		  darkGray: "#333333",
		  borderGray: "#d1d5db",
		  white: "#ffffff",
		  black: "#000000",
		  blue: {
			500: "#3b82f6",
			600: "#2563eb",
		  },
		  gray: {
			300: "#d1d5db",
			500: "#6b7280",
			700: "#374151",
		  },
		  hoverGray: "#f1f5f9",
		},
		borderRadius: {
		  lg: "12px",
		  md: "8px",
		  sm: "4px",
		},
	  },
	},
	plugins: [require("tailwindcss-animate")],
  };
  