import { Avatar, Box, Button, Divider, ListItemIcon, MenuItem } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Settings from "@mui/icons-material/Settings";
import HistoryIcon from "@mui/icons-material/History";
import Logout from "@mui/icons-material/Logout";

const NavAccount = () => {
  const { user, logout } = useAuth();
  return (
    <>
      {user ? (
        <>
          <Box>
            <MenuItem>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Mes informations
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <HistoryIcon fontSize="small" />
              </ListItemIcon>
              Mes commandes
            </MenuItem>
            <Divider />
            <MenuItem onClick={logout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Se déconnecter
            </MenuItem>
          </Box>
        </>
      ) : (
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
      )}
    </>
  );
};
export default NavAccount;
