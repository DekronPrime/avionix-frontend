/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        danger: "var(--danger)",
        warning: "var(--warning)",
        success: "var(--success)",
        accent: "var(--accent)",
        dark: "var(--dark)",
        light: "var(--light)",
      },
      fontFamily: {
        inter: ["var(--font-inter)"],
        ptSerif: ["var(--font-pt-serif)"],
        poppins: ["var(--font-poppins)"],
        orbitron: ["var(--font-orbitron)"],
      },
    },
  },
  plugins: [],
};
