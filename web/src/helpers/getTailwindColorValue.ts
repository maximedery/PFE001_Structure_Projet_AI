import { get, replace } from 'lodash'
import colors from 'tailwindcss/colors'

/**
 * Get the value of a Tailwind color at runtime.
 * https://tailwindcss.com/docs/customizing-colors
 *
 * @example getTailwindColorValue('sky-500') // #0ea5e9
 * @param {string} tailwindColor - The Tailwind color string (e.g., 'sky-500').
 * @returns {string} The corresponding color value in hexadecimal format (e.g., #0ea5e9).
 * @throws {Error} If the specified Tailwind color is not found in tailwindcss/colors.
 */
export function getTailwindColorValue(tailwindColor: string) {
  const colorValue = get(colors, `${replace(tailwindColor, '-', '.')}`)

  if (!colorValue) {
    throw new Error(`Color ${tailwindColor} not found in tailwindcss/colors`)
  }

  return colorValue as string
}
