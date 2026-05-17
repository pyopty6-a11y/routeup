/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'bg-indigo-500/10','text-indigo-500','hover:border-indigo-500/50','bg-indigo-500/5',
    'bg-emerald-500/10','text-emerald-500','hover:border-emerald-500/50','bg-emerald-500/5',
    'bg-teal-500/10','text-teal-500','hover:border-teal-500/50','bg-teal-500/5',
    'bg-pink-500/10','text-pink-500','hover:border-pink-500/50','bg-pink-500/5',
    'bg-amber-500/10','text-amber-500','hover:border-amber-500/50','bg-amber-500/5',
    'group-hover:rotate-12',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
