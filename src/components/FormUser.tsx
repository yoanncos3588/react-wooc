import { Box, Button, Grid } from "@mui/material";
import theme from "../theme";
import { useState } from "react";
import FormUserLocationFields from "./FormUserLocationFields";
import FormUserBasicFields from "./FormUserBasicFields";

const FormUser = () => {
  const [basicFieldsValid, setBasicFieldsValid] = useState(false);
  const [shippingFieldsValid, setShippingFieldsValid] = useState(false);
  const [billingFieldsValid, setBillingFieldsValid] = useState(false);

  return (
    <Box component="form" sx={{ mt: theme.spacing(8) }}>
      <Grid container spacing={2}>
        <FormUserBasicFields setBasicFieldsValid={setBasicFieldsValid} />
        <FormUserLocationFields isBilling={false} setLocationFieldsValid={setShippingFieldsValid} key={"shippingFields"} />
        <FormUserLocationFields isBilling={true} setLocationFieldsValid={setBillingFieldsValid} key={"billingFields"} />
      </Grid>
      <Button variant="contained" color="success" sx={{ mt: theme.spacing(4) }}>
        Créer mon compte
      </Button>
    </Box>
  );
};

export default FormUser;
