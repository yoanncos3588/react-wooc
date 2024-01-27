import { Box, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const NavAccount = () => {
  return (
    <>
      <Box sx={{ px: 2, py: 1 }}>
        <Button
          component={RouterLink}
          to="/login"
          sx={{ display: "block", color: "white", borderColor: "white", width: "100%", textAlign: "center" }}
          variant="outlined"
        >
          Se connecter
        </Button>
      </Box>
      <Box sx={{ px: 2, py: 1 }}>
        <Button component={RouterLink} to="/signup" sx={{ display: "block", width: "100%", textAlign: "center" }} variant="contained" color="success">
          Créer un compte
        </Button>
      </Box>
    </>
  );
};
export default NavAccount;
