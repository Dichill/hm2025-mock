/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                mesa: {
                    "warm-red": "rgb(var(--mesa-warm-red) / <alpha-value>)",
                    grey: "rgb(var(--mesa-grey) / <alpha-value>)",
                    "yellow-107": "rgb(var(--mesa-yellow-107) / <alpha-value>)",
                    "yellow-116": "rgb(var(--mesa-yellow-116) / <alpha-value>)",
                    orange: "rgb(var(--mesa-orange) / <alpha-value>)",
                    rhodamine: "rgb(var(--mesa-rhodamine) / <alpha-value>)",
                    purple: "rgb(var(--mesa-purple) / <alpha-value>)",
                    green: "rgb(var(--mesa-green) / <alpha-value>)",
                },
            },
        },
    },
    plugins: [],
};
