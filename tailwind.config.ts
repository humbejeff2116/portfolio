/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
        colors: {
            accent: '#00ffff',
            background: '#0b0b0f',
            foreground: '#f5f5f5',
        },
        },
    },
    plugins: [],
}
