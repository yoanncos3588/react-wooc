import { SxProps } from "@mui/material";
import StyledOnSale from "../styled/OnSale";

interface Props {
  sx?: SxProps;
}
const OnSale = (props: Props) => {
  return <StyledOnSale {...props}>Promo !</StyledOnSale>;
};

export default OnSale;
