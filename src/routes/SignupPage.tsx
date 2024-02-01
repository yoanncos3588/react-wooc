import { Box, Button, Divider, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import FormUserFields from "../components/FormUserFields";
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
      <Box component="form" sx={{ mt: theme.spacing(8) }}>
        <FormUserFields />
        <Button variant="contained" color="success" sx={{ mt: theme.spacing(4) }}>
          Créer mon compte
        </Button>
      </Box>
    </>
  );
};

export default SignupPage;
