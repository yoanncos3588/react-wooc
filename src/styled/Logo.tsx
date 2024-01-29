import { styled } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const StyledLogo = styled(RouterLink)(({ theme }) => ({
  ...theme.typography.h6,
  color: theme.palette.primary.dark,
  fontWeight: theme.typography.fontWeightBold,
  textDecoration: "none",
  span: {
    color: theme.palette.secondary.light,
    fontWeight: theme.typography.fontWeightLight,
  },
  [theme.breakpoints.up("md")]: {
    ...theme.typography.h5,
  },
}));

export default StyledLogo;
