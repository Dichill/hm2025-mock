/**
 * MESA Brand Colors
 * This file contains the official MESA color palette for use throughout the application
 */

// Primary Colors
export const PRIMARY_COLORS = {
  WARM_RED: {
    hex: "#FF4438",
    rgb: "rgb(255, 69, 57)",
    cmyk: "0/87/79/0",
  },
  GREY_432: {
    hex: "#676C72",
    rgb: "rgb(103, 108, 114)",
    cmyk: "62/50/45/15",
  },
};

// Secondary Colors - used to complement the primary colors
export const SECONDARY_COLORS = {
  YELLOW_107: {
    hex: "#FFE550",
    rgb: "rgb(255, 230, 81)",
    cmyk: "0/7/78/0",
  },
  YELLOW_116: {
    hex: "#FFB607",
    rgb: "rgb(255, 182, 10)",
    cmyk: "0/34/95/0",
  },
  ORANGE_151: {
    hex: "#FF893E",
    rgb: "rgb(255, 137, 62)",
    cmyk: "0/58/78/0",
  },
  RHODAMINE_RED: {
    hex: "#E94D97",
    rgb: "rgb(234, 78, 152)",
    cmyk: "2/84/3/0",
  },
};

// Tertiary Colors - used minimally as a highlight color
export const TERTIARY_COLORS = {
  PURPLE_2655: {
    hex: "#A289D7",
    rgb: "rgb(162, 137, 215)",
    cmyk: "38/48/0/0",
  },
  GREEN_367: {
    hex: "#8DCF6A",
    rgb: "rgb(141, 207, 106)",
    cmyk: "47/0/77/0",
  },
};

// Combined color palette
export const MESA_COLORS = {
  ...PRIMARY_COLORS,
  ...SECONDARY_COLORS,
  ...TERTIARY_COLORS,
};

/**
 * CSS Variables for use in Tailwind
 * These can be added to globals.css
 */
export const CSS_VARIABLES = {
  // Light theme
  light: `
  --mesa-warm-red: 255 69 57;
  --mesa-grey: 103 108 114;
  --mesa-yellow-107: 255 230 81;
  --mesa-yellow-116: 255 182 10;
  --mesa-orange: 255 137 62;
  --mesa-rhodamine: 234 78 152;
  --mesa-purple: 162 137 215;
  --mesa-green: 141 207 106;
  `,

  // Dark theme adjustments could be added here if needed
  dark: `
  --mesa-warm-red: 255 69 57;
  --mesa-grey: 103 108 114;
  --mesa-yellow-107: 255 230 81;
  --mesa-yellow-116: 255 182 10;
  --mesa-orange: 255 137 62;
  --mesa-rhodamine: 234 78 152;
  --mesa-purple: 162 137 215;
  --mesa-green: 141 207 106;
  `,
};

/**
 * Tailwind Color Object
 *
 * This can be used in tailwind.config.js to extend the color palette
 * Example:
 *
 * // In tailwind.config.js
 * const { TAILWIND_COLORS } = require('./lib/colors.ts');
 *
 * module.exports = {
 *   theme: {
 *     extend: {
 *       colors: TAILWIND_COLORS
 *     }
 *   }
 * }
 */
export const TAILWIND_COLORS = {
  // mesa: {
  "warm-red": "rgb(var(--mesa-warm-red) / <alpha-value>)",
  grey: "rgb(var(--mesa-grey) / <alpha-value>)",
  "yellow-107": "rgb(var(--mesa-yellow-107) / <alpha-value>)",
  "yellow-116": "rgb(var(--mesa-yellow-116) / <alpha-value>)",
  orange: "rgb(var(--mesa-orange) / <alpha-value>)",
  rhodamine: "rgb(var(--mesa-rhodamine) / <alpha-value>)",
  purple: "rgb(var(--mesa-purple) / <alpha-value>)",
  green: "rgb(var(--mesa-green) / <alpha-value>)",
  // },
};

export const HackMESA_casing = "HackMESA";
export const mobile_size_reference = 800;
export const backgroundColor = "#433966"

export default MESA_COLORS;

export function darkenColor(hex: string, percent: number) {
  // Remove the '#' if it exists
  hex = hex.replace("#", "");

  // Parse hex values to RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Calculate darkened RGB values
  const newR = Math.max(0, Math.floor(r * (1 - percent / 100)));
  const newG = Math.max(0, Math.floor(g * (1 - percent / 100)));
  const newB = Math.max(0, Math.floor(b * (1 - percent / 100)));

  // Convert back to hex
  const toHex = (c: number) => {
    const hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  const newHex = `#${toHex(newR)}${toHex(newG)}${toHex(newB)}`;

  return newHex;
}
