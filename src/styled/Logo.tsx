import { styled } from "@mui/material";
import isPropValid from "@emotion/is-prop-valid";
import { Link as RouterLink } from "react-router-dom";

interface Props {
  disableNav: boolean;
}

// @ts-expect-error: https://github.com/emotion-js/emotion/issues/2220
const StyledLogo = styled(RouterLink, { shouldForwardProp: (prop) => isPropValid(prop) && prop != "disabledNav" })(({ theme, disableNav }: Props) => ({
  ...theme.typography.h6,
  color: theme.palette.primary.dark,
  fontWeight: theme.typography.fontWeightBold,
  textDecoration: "none",
  pointerEvents: disableNav ? "none" : "auto",
  span: {
    color: theme.palette.secondary.light,
    fontWeight: theme.typography.fontWeightLight,
  },
  [theme.breakpoints.up("md")]: {
    ...theme.typography.h5,
  },
}));

export default StyledLogo;
