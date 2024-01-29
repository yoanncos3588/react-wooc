import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Drawer from "@mui/material/Drawer";
import { useState } from "react";
import DrawerContent from "../components/DrawerContent";
import Container from "@mui/material/Container";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";

const Root = () => {
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === "keydown" && ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")) {
      return;
    }
    setDrawerOpen((prevState) => !prevState);
  };

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Header toggleDrawer={toggleDrawer} />
        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
          <DrawerContent />
        </Drawer>
        <Container sx={{ my: theme.spacing(1), flexGrow: 1 }}>
          <Outlet />
        </Container>
        <Box sx={{ backgroundColor: theme.palette.primary.light, height: "50px" }}>Footer content here</Box>
      </Box>
    </>
  );
};

export default Root;
