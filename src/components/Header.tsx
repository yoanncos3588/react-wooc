import Logo from "./Logo";
import { useTheme } from "@mui/system";
import { AppBar, Box, Button, IconButton, Menu, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const theme = useTheme();
  const breakpointUpMd = useMediaQuery(theme.breakpoints.up("md"));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <AppBar position="static" color="primary" enableColorOnDark>
      <Toolbar>
        {!breakpointUpMd && (
          <Box>
            <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
          </Box>
        )}
        <Box sx={{ flexGrow: 1, [theme.breakpoints.up("md")]: { flexGrow: 0 } }}>
          <Logo />
        </Box>
        {breakpointUpMd && (
          <Box sx={{ flexGrow: 1, pl: 2, my: 2 }}>
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
          </Box>
        )}
        <Box>
          {breakpointUpMd ? (
            <Button
              startIcon={<PersonIcon />}
              sx={{ color: "white" }}
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              Mon compte
            </Button>
          ) : (
            <IconButton
              size="large"
              sx={{ px: 2 }}
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <PersonIcon />
            </IconButton>
          )}
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <Box sx={{ px: 2, py: 1 }}>
              <Button sx={{ display: "block", color: "white", borderColor: "white", width: "100%" }} variant="outlined">
                Se connecter
              </Button>
            </Box>
            <Box sx={{ px: 2, py: 1 }}>
              <Button sx={{ display: "block", width: "100%" }} variant="contained" color="success">
                Créer un compte
              </Button>
            </Box>
          </Menu>
        </Box>
        <IconButton aria-label="mon panier" size="large" sx={{ px: 2 }} edge="end">
          <ShoppingCartIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
