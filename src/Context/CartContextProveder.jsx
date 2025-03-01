import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export let Cartcontext = createContext();

export default function CartContextProveder({ children }) {
  // تأكد من تهيئة العداد برقم ابتدائي (مثلاً 0)
  const [numsCartItems, setnumsCartItems] = useState(0);
  const baseUrl = "https://ecommerce.routemisr.com/api/v1/cart";

  const headerOptions = {
    headers: {
      token: localStorage.getItem("token"),
    },
  };

  useEffect(() => {
    async function fetchCart() {
      if (localStorage.getItem("token")) {
        try {
          const res = await getUserCart();
          setnumsCartItems(res.data.numOfCartItems);
        } catch (error) {
          console.error("Error fetching cart:", error);
        }
      }
    }
    fetchCart();
  }, []);

  function getUserCart() {
    return axios.get(baseUrl, headerOptions);
  }

  function clearCart() {
    return axios.delete(baseUrl, headerOptions);
  }

  function deleteItem(id) {
    return axios.delete(`${baseUrl}/${id}`, headerOptions);
  }

  function updateCartItem(id, count) {
    return axios.put(`${baseUrl}/${id}`, { count }, headerOptions);
  }

  function addUserCart(id) {
    return axios.post(baseUrl, { productId: id }, headerOptions);
  }

  return (
    <Cartcontext.Provider
      value={{
        getUserCart,
        numsCartItems,
        setnumsCartItems,
        addUserCart,
        deleteItem,
        clearCart,
        updateCartItem,
      }}
    >
      {children}
    </Cartcontext.Provider>
  );
}
