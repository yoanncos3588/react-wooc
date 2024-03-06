import { Box, Divider } from "@mui/material";
import Logo from "./Logo";
import NavAccount from "./NavAccount";
import NavMain from "./NavMain";

const DrawerContent = () => {
  return (
    <>
      <Box sx={{ p: 1 }}>
        <Logo />
        <Divider sx={{ my: 2 }} aria-hidden="true" />
        <NavMain />
        <Divider sx={{ my: 2 }} aria-hidden="true" />
        <NavAccount showInDrawer={true} />
      </Box>
    </>
  );
};

export default DrawerContent;
