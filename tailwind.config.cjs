/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#2DD4BF',
                    hover: '#14B8A6',
                },
            },
            fontFamily: {
                sora: ['Sora', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
