import { styled } from "@mui/material/styles";

const StyledNavMain = styled("nav")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  "& > a": {
    justifyContent: "start",
    margin: `${theme.spacing(1)} 0`,
  },
  [theme.breakpoints.up("md")]: {
    flexDirection: "row",
    "& > a": {
      justifyContent: "center",
      margin: 0,
    },
  },
}));

export default StyledNavMain;
