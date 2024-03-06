import { Alert, Box, Button, Grid } from "@mui/material";
import theme from "../theme";
import TextFieldWithValidation from "./TextFieldWithValidation";
import validation from "../services/validation/validation";
import { api } from "../services/api/api";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { FormEvent } from "react";
import Loading from "./Loading";
import { useAuth } from "../hooks/useAuth";

const FormLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const mutation = useMutation({
    mutationFn: ({ username, password }: { username: string; password: string }) => api.customer.login({ username, password }),
    onSuccess: (data) => {
      login && login(data);
      setTimeout(() => {
        navigate("/");
      }, 3000);
    },
  });

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    const isDataValid = validation.validData({ username, password }, validation.rules.login);

    if (isDataValid) {
      mutation.mutate({ username, password });
    }
  }

  return (
    <>
      {mutation.isPending && <Loading />}
      <Box component="form" sx={{ maxWidth: 500 }} data-test-id="form-login" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextFieldWithValidation type="text" label="Nom d'utilisateur" name="username" validationRules={validation.rules.login.username} />
          </Grid>
          <Grid item xs={12}>
            <TextFieldWithValidation type="password" label="Mot de passe" name="password" validationRules={validation.rules.login.password} />
          </Grid>
        </Grid>
        {mutation.isSuccess && (
          <Alert severity="success" variant="filled" sx={{ mt: theme.spacing(1) }} data-test-id="alert-success">
            Connexion réussie, vous allez être redirigé…
          </Alert>
        )}
        {mutation.isError && (
          <Alert severity="error" variant="filled" sx={{ mt: theme.spacing(1) }} data-test-id="alert-error">
            Une erreur est survenue : {mutation.error.message}
          </Alert>
        )}
        <Button
          variant="contained"
          color="success"
          sx={{ mt: theme.spacing(4) }}
          disabled={mutation.isPending || mutation.isSuccess}
          type="submit"
          data-test-id="btn-send-data"
        >
          Se connecter
        </Button>
      </Box>
    </>
  );
};

export default FormLogin;
