import Logo from "./Logo";
import { useTheme } from "@mui/system";
import { AppBar, Box, IconButton, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Link as RouterLink } from "react-router-dom";
import NavMain from "./NavMain";
import ButtonMyAccount from "./ButtonMyAccount";

const Header = () => {
  const theme = useTheme();
  const breakpointUpMd = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <AppBar position="static" color="primary" enableColorOnDark>
      <Toolbar>
        {/** BURGER BUTTON */}
        {!breakpointUpMd && (
          <Box>
            <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
          </Box>
        )}
        {/** LOGO */}
        <Box sx={{ flexGrow: 1, [theme.breakpoints.up("md")]: { flexGrow: 0 } }}>
          <Logo />
        </Box>
        {/** NAV */}
        {breakpointUpMd && (
          <Box sx={{ flexGrow: 1, pl: 2, my: 2 }}>
            <NavMain />
          </Box>
        )}
        {/** ACCOUNT */}
        <Box>
          <ButtonMyAccount />
        </Box>
        {/** CART */}
        <IconButton component={RouterLink} to="#" aria-label="mon panier" size="large" sx={{ px: 2 }} edge="end">
          <ShoppingCartIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
