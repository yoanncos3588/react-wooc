import { Theme } from "@mui/system";

/**
 * Hide component up to Md breakpoint
 * @param theme useTheme instance
 * @returns {object} with css properties
 */
export const hideUpMd = (theme: Theme) => ({
  [theme.breakpoints.up("md")]: {
    display: "none",
  },
});

/**
 * Show component up to Md breakpoint
 * @param theme useTheme instance
 * @returns {object} with css properties
 */
export const showUpMd = (theme: Theme, display: string) => ({
  [theme.breakpoints.up("md")]: {
    display,
  },
});
