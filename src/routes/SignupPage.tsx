import { Box, Divider, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import FormUser from "../components/FormUser";
const SignupPage = () => {
  const theme = useTheme();

  return (
    <>
      <Box>
        <Typography component="h1" variant="h2">
          Créer un compte
        </Typography>
        <Divider sx={{ my: theme.spacing(2) }} />
      </Box>
      <FormUser />
    </>
  );
};

export default SignupPage;
