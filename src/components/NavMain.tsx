import { Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import StyledNavMain from "../styled/NavMain";

const NavMain = () => {
  return (
    <StyledNavMain>
      <Button component={RouterLink} variant="text" sx={{ color: "white" }} to="/">
        Menu 1
      </Button>
      <Button component={RouterLink} variant="text" sx={{ color: "white" }} to="/">
        Menu 1
      </Button>
      <Button component={RouterLink} variant="text" sx={{ color: "white" }} to="/">
        Menu 1
      </Button>
      <Button component={RouterLink} variant="text" sx={{ color: "white" }} to="/">
        Menu 1
      </Button>
    </StyledNavMain>
  );
};

export default NavMain;
