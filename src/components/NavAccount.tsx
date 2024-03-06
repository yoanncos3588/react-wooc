import { Box, Button, Divider, ListItemIcon, MenuItem } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Settings from "@mui/icons-material/Settings";
import HistoryIcon from "@mui/icons-material/History";
import Logout from "@mui/icons-material/Logout";
import { useTheme } from "@mui/material/styles";

interface Props {
  showInDrawer?: boolean;
}
const NavAccount = ({ showInDrawer = false }: Props) => {
  const { user, logout } = useAuth();
  const theme = useTheme();

  const menuItemSx = { pl: showInDrawer ? 0 : theme.spacing(2), [theme.breakpoints.up("md")]: { pl: theme.spacing(2) } };
  return (
    <>
      {user ? (
        <>
          <MenuItem sx={{ ...menuItemSx }}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Mes informations
          </MenuItem>
          <MenuItem sx={{ ...menuItemSx }}>
            <ListItemIcon>
              <HistoryIcon fontSize="small" />
            </ListItemIcon>
            Mes commandes
          </MenuItem>
          <Divider />
          <MenuItem onClick={logout} sx={{ ...menuItemSx }}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Se déconnecter
          </MenuItem>
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
