import { Alert } from "@mui/material";
import { useLocation } from "react-router-dom";

const GlobalRouterAlert = () => {
  const location = useLocation();
  const state = location.state;

  return (
    state &&
    state.errorMessage && (
      <Alert severity="error" sx={{ mb: 2 }}>
        {state.errorMessage}
      </Alert>
    )
  );
};

export default GlobalRouterAlert;
