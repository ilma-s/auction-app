/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                trueGray: {
                    500: '#9B9B9B',
                    800: '#252525',
                },
                trueWhite: {
                    800: '#E3E3E3',
                },
                trueIndigo: {
                    500: '#8367D8',
                },
            },
            fontFamily: {
                lato: ['Lato', 'sans'],
            },
            fontWeight: {
                light: 300,
                normal: 400,
                bold: 700,
            },
            textStyles: {
                'lato-light': {
                    fontFamily: 'lato',
                    fontWeight: 'light',
                },
                'lato-normal': {
                    fontFamily: 'lato',
                    fontWeight: 'normal',
                },
                'lato-bold': {
                    fontFamily: 'lato',
                    fontWeight: 'bold',
                },
            },
        },
    },
    plugins: [],
};
