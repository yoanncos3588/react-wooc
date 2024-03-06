import { styled } from "@mui/material/styles";

const StyledOnSale = styled("span")(({ theme }) => ({
  background: `${theme.palette.warning.main}`,
  fontSize: `${theme.typography.caption.fontSize}`,
  borderRadius: `${theme.shape.borderRadius}px`,
  padding: `${theme.spacing(0.5)} ${theme.spacing(1)}`,
  textTransform: "uppercase",
}));

export default StyledOnSale;
