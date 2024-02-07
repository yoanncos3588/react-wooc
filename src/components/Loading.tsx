import { Backdrop, CircularProgress } from "@mui/material";
import zIndex from "@mui/material/styles/zIndex";

const Loading = () => {
  return (
    <Backdrop open={true} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <CircularProgress />
    </Backdrop>
  );
};

export default Loading;
