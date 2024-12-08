/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    // 暂时注释掉 forms 插件，因为它可能导致问题
    // forms
  ],
} 