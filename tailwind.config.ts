import type { Config } from 'tailwindcss';
import tailwindcssAnimate from 'tailwindcss-animate';

type ColorValue = string | ColorDictionary;
interface ColorDictionary {
  [colorName: string]: ColorValue;
}

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        black: {
          DEFAULT: '#000',
          100: '#000319',
        },
        'darkest-purple': '#240046',
        'darker-purple': '#3C096C',
        'dark-purple': '#5A189A',
        purple: '#7B2CBF',
        'light-purple': '#9D4EDD',

        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      typography: {
        wrap: {
          '*': {
            wordBreak: 'break-word',
            overflowWrap: 'break-word',
          },
        },
      },
    },
  },
  plugins: [tailwindcssAnimate, addVariablesForColors],
};

export default config;

// Plugin to add each Tailwind color as a CSS variable
function addVariablesForColors({
  addBase,
  theme,
}: {
  addBase: (styles: Record<string, Record<string, string>>) => void;
  theme: (path: string) => unknown;
}) {
  const colors = theme('colors') as ColorDictionary;
  const flattenedColors = flattenColors(colors);
  const newVars = Object.fromEntries(
    Object.entries(flattenedColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ':root': newVars,
  });
}

// Recursive function to flatten nested color objects
function flattenColors(
  colors: ColorDictionary,
  prefix = ''
): Record<string, string> {
  const result: Record<string, string> = {};
  for (const [key, value] of Object.entries(colors)) {
    if (typeof value === 'string') {
      // If the value is a string, add it to the result
      result[prefix + key] = value;
    } else if (typeof value === 'object' && value !== null) {
      // If the value is an object, recursively flatten it
      Object.assign(result, flattenColors(value, `${prefix}${key}-`));
    }
  }
  return result;
}
