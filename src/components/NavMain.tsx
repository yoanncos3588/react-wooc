import { Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const NavMain = () => {
  return (
    <nav>
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
    </nav>
  );
};

export default NavMain;
