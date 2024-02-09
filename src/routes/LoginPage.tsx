import { Box, Divider, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import FormLogin from "../components/FormLogin";
const LoginPage = () => {
  const theme = useTheme();

  return (
    <>
      <Box>
        <Typography component="h1" variant="h2">
          Se connecter
        </Typography>
        <Divider sx={{ my: theme.spacing(2) }} />
      </Box>
      <FormLogin />
    </>
  );
};

export default LoginPage;
