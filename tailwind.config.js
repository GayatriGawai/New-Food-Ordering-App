/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: 'red',
                success: '#34D399', //bg-green-400
                danger: ' #DC2626', //bg-red-600
                warning: '#F59E0B', //bg-yellow-500
            },
            screens: {
                tablet: '640px',
                laptop: '1024px',
                desktop: '1280px',
            },
        },
    },
    plugins: [],
};
