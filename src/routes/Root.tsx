import { Outlet, useNavigation } from "react-router-dom";
import Header from "../components/Header";
import Drawer from "@mui/material/Drawer";
import { useState } from "react";
import DrawerContent from "../components/DrawerContent";
import Container from "@mui/material/Container";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { CircularProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { categoriesQuery } from "../queries";
import DialogProvider from "../context/DialogContext";

const Root = () => {
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { state } = useNavigation();

  const { isPending: isPendingCategories } = useQuery(categoriesQuery());

  const toggleDrawer = (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === "keydown" && ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")) {
      return;
    }
    setDrawerOpen((prevState) => !prevState);
  };

  return (
    <>
      <DialogProvider>
        <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
          {isPendingCategories ? (
            <Container sx={{ my: theme.spacing(5), flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <CircularProgress />
            </Container>
          ) : (
            <>
              <Header toggleDrawer={toggleDrawer} />
              <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
                <DrawerContent />
              </Drawer>
              {state === "loading" ? (
                <Container sx={{ my: theme.spacing(5), flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <CircularProgress />
                </Container>
              ) : (
                <>
                  <Container sx={{ my: theme.spacing(5), flexGrow: 1 }}>
                    <Outlet />
                  </Container>
                  <Box sx={{ backgroundColor: theme.palette.primary.light, height: "50px" }}>Footer content here</Box>
                </>
              )}
            </>
          )}
        </Box>
      </DialogProvider>
    </>
  );
};

export default Root;
