import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import darkTheme from "./theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CategoryPage from "./routes/CategoryPage";
import ErrorPage from "./routes/ErrorPage";
import ProductPage from "./routes/ProductPage";
import Root from "./routes/Root";
import SignupPage from "./routes/SignupPage";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { categoryProductsLoader, countriesLoader, productLoader } from "./loader";
import LoginPage from "./routes/LoginPage";
import { RouteProtected } from "./components/RouteProtected";
import AuthProvider from "./context/AuthContext";
import { RouteForGuestOnly } from "./components/RouteForGuestOnly";
import CartProvider from "./context/CartContext";

export const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: "signup",
        element: <SignupPage />,
        loader: countriesLoader(queryClient),
      },
      {
        path: "login",
        element: (
          <RouteForGuestOnly>
            <LoginPage />
          </RouteForGuestOnly>
        ),
      },
      {
        path: "private",
        element: (
          <RouteProtected>
            <CategoryPage />
          </RouteProtected>
        ),
      },
      {
        path: "product/:slug/:id",
        element: <ProductPage />,
        loader: productLoader(queryClient),
      },
      {
        path: "category/:slug/:id",
        element: <CategoryPage />,
        loader: categoryProductsLoader(queryClient),
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
        <AuthProvider>
          <CartProvider>
            <RouterProvider router={router} />
          </CartProvider>
        </AuthProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
