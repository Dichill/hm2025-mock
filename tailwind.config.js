import { TAILWIND_COLORS } from "./lib/colors.ts";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: TAILWIND_COLORS,
        },
    },
    plugins: [],
};
