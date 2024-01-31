import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import darkTheme from "./theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CategoryPage from "./routes/CategoryPage";
import ErrorPage from "./routes/ErrorPage";
import ProductPage from "./routes/ProductPage";
import Root from "./routes/Root";
import SignupPage from "./routes/SignupPage";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { countriesLoader } from "./loader";

export const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "signup",
        element: <SignupPage />,
        loader: countriesLoader(queryClient),
      },
      {
        path: "category/:categoryId",
        element: <CategoryPage />,
      },
      {
        path: "product/:categoryId",
        element: <ProductPage />,
      },
    ],
  },
]);
const theme = darkTheme;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
