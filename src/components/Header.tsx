import Logo from "./Logo";
import { useTheme } from "@mui/material/styles";
import { AppBar, Badge, Box, IconButton, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NavMain from "./NavMain";
import ButtonMyAccount from "./ButtonMyAccount";
import { hideUpMd, showUpMd } from "../styled/utils";
import CartButton from "./CartButton";

interface Props {
  toggleDrawer: (event: React.KeyboardEvent | React.MouseEvent) => void;
}

const Header = ({ toggleDrawer }: Props) => {
  const theme = useTheme();

  return (
    <AppBar position="static" color="primary" enableColorOnDark>
      <Toolbar>
        {/** BURGER BUTTON */}
        <Box sx={{ ...hideUpMd(theme) }}>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={(event) => toggleDrawer(event)}>
            <MenuIcon />
          </IconButton>
        </Box>
        {/** LOGO */}
        <Box sx={{ flexGrow: 1, [theme.breakpoints.up("md")]: { flexGrow: 0 } }}>
          <Logo />
        </Box>
        {/** NAV */}
        <Box sx={{ flexGrow: 1, pl: 2, my: 2, display: "none", ...showUpMd(theme, "flex") }}>
          <NavMain />
        </Box>
        {/** ACCOUNT */}
        <Box>
          <ButtonMyAccount />
        </Box>
        {/** CART */}
        <CartButton />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
