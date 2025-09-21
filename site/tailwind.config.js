/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,md,njk}"],
    theme: {
        extend: {
            colors: {
                'text-primary': '#1a1a1a',
                'text-secondary': '#4a5568',
                'text-muted': '#718096',
                'text-pink1': 'rgb(148, 27, 107)',
                'text-pink2': 'rgb(184, 38, 118)',
                'text-pink3': 'rgb(222, 105, 170)',
                'accent': 'rgb(184, 38, 118)',
                'accent-light': 'rgb(222, 105, 170)',
                'body-bg': '#f9fafb',
                'paper-bg': '#fefefe',
                'code-bg': '#f8fafc',
                'border-light': '#e2e8f0'
            },
            fontFamily: {
                'serif': ['Georgia', 'serif'],
                'sans': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
                'mono': ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace']
            }
        },
    },
    plugins: [],
}
