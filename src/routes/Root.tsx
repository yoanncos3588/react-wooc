import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Drawer from "@mui/material/Drawer";
import { useState } from "react";
import DrawerContent from "../components/DrawerContent";

const Root = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === "keydown" && ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")) {
      return;
    }
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <Header toggleDrawer={toggleDrawer} />
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        <DrawerContent />
      </Drawer>
      <Outlet />
    </>
  );
};

export default Root;
