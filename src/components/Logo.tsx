import { Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const Logo = () => {
  return (
    <Link component={RouterLink} to="/">
      ReactWOOC
    </Link>
  );
};

export default Logo;
