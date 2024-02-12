import { useTheme } from "@mui/material/styles";
import { Avatar, Button, IconButton, Menu, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import NavAccount from "./NavAccount";
import { useState } from "react";
import { hideUpMd, showUpMd } from "../styled/utils";
import { useAuth } from "../hooks/useAuth";

const ButtonMyAccount = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const theme = useTheme();
  const { user } = useAuth();

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const commonButtonProps = {
    onClick: handleClick,
    "aria-controls": open ? "basic-menu" : undefined,
    "aria-haspopup": true,
    "aria-expanded": open ? true : undefined,
  };

  return (
    <>
      {user ? (
        <>
          <Button {...commonButtonProps} sx={{ color: "white" }}>
            <Avatar sx={{ mr: theme.spacing(1) }} />{" "}
            <Typography sx={{ display: "none", ...showUpMd(theme, "flex") }} variant="caption">
              {user.username}
            </Typography>
          </Button>
        </>
      ) : (
        <>
          <Button startIcon={<PersonIcon />} sx={{ color: "white", display: "none", ...showUpMd(theme, "flex") }} {...commonButtonProps}>
            Mon compte
          </Button>
          <IconButton size="large" sx={{ px: 2, ...hideUpMd(theme) }} {...commonButtonProps}>
            <PersonIcon />
          </IconButton>
        </>
      )}

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
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
