module.exports = {
    mode: process.env.NODE_ENV && 'jit',
    content: ['./src/pages/**/*.{ts,tsx}', './src/components/**/*.{ts,tsx}'],
    theme: {
        extend: {

        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
}
