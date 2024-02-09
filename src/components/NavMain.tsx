import { Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import StyledNavMain from "../styled/NavMain";
import { useAuth } from "../hooks/useAuth";

const NavMain = () => {
  const { logout } = useAuth();
  return (
    <StyledNavMain>
      <Button component={RouterLink} variant="text" sx={{ color: "white" }} to="/">
        Menu 1
      </Button>
      <Button component={RouterLink} variant="text" sx={{ color: "white" }} to="/">
        Menu 1
      </Button>
      <Button variant="text" sx={{ color: "white" }} onClick={logout}>
        logout
      </Button>
      <Button component={RouterLink} variant="text" sx={{ color: "white" }} to="/private">
        private
      </Button>
    </StyledNavMain>
  );
};

export default NavMain;
