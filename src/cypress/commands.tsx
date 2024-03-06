import { mount } from "cypress/react18";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@mui/material/styles";
import darkTheme from "../theme";
import CssBaseline from "@mui/material/CssBaseline";

Cypress.Commands.add("mount", (component, options = {}) => {
  const { routerProps = { initialEntries: ["/"] }, ...mountOptions } = options;
  const queryClient = new QueryClient();

  const wrapped = (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={darkTheme}>
        <MemoryRouter {...routerProps}>{component}</MemoryRouter>
        <CssBaseline />
      </ThemeProvider>
    </QueryClientProvider>
  );

  return mount(wrapped, mountOptions);
});
