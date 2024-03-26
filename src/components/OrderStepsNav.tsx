import { Box, Button } from "@mui/material";
import { SetStateAction } from "react";

interface Props {
  activeStep: number;
  setActiveStep: React.Dispatch<SetStateAction<number>>;
  children: React.ReactNode;
}
const OrderStepsNav = ({ activeStep, setActiveStep, children }: Props) => {
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
      <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
        Back
      </Button>
      <Box sx={{ flex: "1 1 auto" }} />
      {children}
    </Box>
  );
};

export default OrderStepsNav;
