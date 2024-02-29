import { Box, Divider, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from "react";

interface Props {
  children?: React.ReactNode;
  title: string;
}

const PageTitle = ({ children, title }: Props) => {
  const theme = useTheme();
  return (
    <Box sx={{ mb: theme.spacing(8) }}>
      <Typography component="h1" variant="h2">
        {title}
      </Typography>
      <Divider sx={{ my: theme.spacing(2) }} />
      {children}
    </Box>
  );
};

export default PageTitle;
