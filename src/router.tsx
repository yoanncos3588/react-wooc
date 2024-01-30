import { createBrowserRouter } from "react-router-dom";
import CategoryPage from "./routes/CategoryPage";
import ErrorPage from "./routes/ErrorPage";
import ProductPage from "./routes/ProductPage";
import Root from "./routes/Root";
import SignupPage from "./routes/SignupPage";

const routerInstance = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "signup",
        element: <SignupPage />,
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

export default routerInstance;
