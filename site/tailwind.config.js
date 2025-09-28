/** @type {import('tailwindcss').Config} */
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,njk,md}"],
    theme: {
        extend: {
            colors: {
                'text-primary': '#1a1a1a',
                'text-secondary': '#4a5568',
                'text-muted': '#718096',
                'text-pink1': 'rgb(148, 27, 107)',
                'text-pink2': 'rgb(184, 38, 118)',
                'text-pink3': 'rgb(222, 105, 170)',
                'body-bg': '#f9fafb',
                'paper-bg': '#fefefe',
                'code-bg': '#f8fafc',
                'border-light': '#e2e8f0',
            },
            fontFamily: {
                'serif': ['Georgia', 'serif'],
                'sans': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
                'mono': ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
            },
            fontSize: {
                'base': '18px',
            },
            lineHeight: {
                'relaxed': '1.7',
            },
            boxShadow: {
                'paper': '0 2px 16px rgba(0, 0, 0, 0.08)',
                'float': '0 8px 32px rgba(0, 0, 0, 0.12)',
            },
            backdropFilter: {
                'blur-20': 'blur(20px)',
            },
            animation: {
                'pulse-custom': 'pulse-custom 2s infinite',
                'bounce-custom': 'bounce-custom 5s infinite',
            },
            keyframes: {
                'pulse-custom': {
                    '0%, 100%': {
                        opacity: '1',
                        transform: 'scale(1)'
                    },
                    '50%': {
                        opacity: '0.5',
                        transform: 'scale(1.1)'
                    },
                },
                'bounce-custom': {
                    '0%, 100%': {
                        transform: 'translateX(-50%) translateY(0)'
                    },
                    '50%': {
                        transform: 'translateX(-50%) translateY(-6px)'
                    },
                }
            },
            screens: {
                'sm': { 'max': '480px' },
                'md': { 'max': '768px' },
            },
        },
    },
    plugins: [],
}
