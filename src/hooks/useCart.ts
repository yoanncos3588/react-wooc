import { useState } from "react";

export const useCart = () => {
  const [cart, setCart] = useState([]);

  function createCart() {
    if (!localStorage.getItem("cart")) {
      localStorage.setItem("cart", cart.toString());
    }
  }
};
