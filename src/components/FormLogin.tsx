import { Alert, Box, Button, Grid, Stack } from "@mui/material";
import theme from "../theme";
import TextFieldWithValidation from "./TextFieldWithValidation";
import validation from "../services/validation/validation";
import { api } from "../services/api/api";
import { useMutation } from "@tanstack/react-query";
import { FormEvent } from "react";
import Loading from "./Loading";
import { useAuth } from "../hooks/useAuth";
import { AxiosError } from "axios";
import DOMPurify from "dompurify";
import { useNavigate } from "react-router-dom";

interface Props {
  handleSuccess: () => void;
  handleSignup?: () => void;
}

const FormLogin = ({ handleSuccess, handleSignup }: Props) => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: ({ username, password }: { username: string; password: string }) => {
      return api.customer.login({ username, password });
    },

    onSuccess: (data) => {
      login && login(data);
      setTimeout(() => {
        handleSuccess();
      }, 3000);
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onError: (_error: AxiosError<{ code: string; message: string }>) => {},
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

  /** if more action are needed before redirecting (ex: closing dialog) */
  function handleClickSignup() {
    if (handleSignup) {
      handleSignup();
    }
    navigate("/signup");
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
            Connexion réussie, veuillez patienter…
          </Alert>
        )}
        {mutation.isError && (
          <Alert severity="error" variant="filled" sx={{ mt: theme.spacing(1) }} data-test-id="alert-error">
            <span
              dangerouslySetInnerHTML={{
                __html: mutation.error.response?.data.message ? DOMPurify.sanitize(mutation.error.response?.data.message) : "Une erreur est survenue",
              }}
            />
          </Alert>
        )}
        <Stack direction={"row"} gap={2} alignItems={"center"} mt={4}>
          <Button variant="contained" color="success" disabled={mutation.isPending || mutation.isSuccess} type="submit" data-test-id="btn-send-data">
            Se connecter
          </Button>
          <Button variant="text" onClick={handleClickSignup}>
            Se créer un compte
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default FormLogin;
