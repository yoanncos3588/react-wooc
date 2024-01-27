import { useTheme } from "@mui/system";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Button, IconButton, Menu } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import NavAccount from "./NavAccount";
import { useState } from "react";

const ButtonMyAccount = () => {
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
    <>
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
        <NavAccount />
      </Menu>
    </>
  );
};

export default ButtonMyAccount;
