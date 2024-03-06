import { styled } from "@mui/material/styles";

const StyledProductPrice = styled("span")(({ theme }) => ({
  ".price": {
    "&--old": { opacity: "0.3", marginRight: 8 },
    "&--sale": { color: theme.palette.warning.main },
  },
}));

export default StyledProductPrice;
