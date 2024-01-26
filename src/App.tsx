import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { Test } from "./Test";
import viteLogo from "/vite.svg";
import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Test />
      </QueryClientProvider>
    </>
  );
}

export default App;
