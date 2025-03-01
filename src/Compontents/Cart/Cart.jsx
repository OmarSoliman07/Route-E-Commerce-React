import React, { useContext, useEffect, useState } from "react";
import { Cartcontext } from "../../Context/CartContextProveder";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import empty_cart from "../../assets/images/Empty Cart Image.avif";

export default function Cart() {
  const { getUserCart, deleteItem, setnumsCartItems, clearCart, updateCartItem } = useContext(Cartcontext);
  const [cartData, setCartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCartData();
  }, []);

  async function getCartData() {
    setLoading(true);
    try {
      const res = await getUserCart();
      setCartData(res.data.data);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteItem(id) {
    try {
      const res = await deleteItem(id);
      toast.success("Item successfully deleted.");
      setCartData(res.data.data);
      setnumsCartItems(res?.data?.numOfCartItems);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  }

  async function handleClearCart() {
    try {
      const res = await clearCart();
      toast.success("Cart successfully cleared.");
      setCartData(res.data.data);
      setnumsCartItems(res?.data?.numOfCartItems);
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  }

  async function updateCartItemHandler(id, count) {
    try {
      const res = await updateCartItem(id, count);
      toast.success("Cart updated successfully.");
      setCartData(res.data.data);
      setnumsCartItems(res?.data?.numOfCartItems);
    } catch (error) {
      console.error("Error updating cart item:", error);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <>
      <Toaster />
      {cartData?.products.length > 0 ? (
        <div className="w-11/12 mx-auto my-5">
          <div className="bg-gray-300 dark:bg-gray-700 p-5 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Shopping Cart</h2>
            <div className="flex justify-between items-center mt-3">
              <h2 className="text-2xl text-lime-700">
                Total Cart Price: {cartData?.totalCartPrice} EGP
              </h2>
              <button
                onClick={handleClearCart}
                className="border p-2 text-lg border-red-700 rounded bg-red-700 text-white hover:bg-red-800 transition"
              >
                Clear Cart
              </button>
            </div>

            <div className="divide-y-2 divide-gray-500 mt-5">
              {cartData?.products?.map((item) => (
                <div key={item._id} className="flex items-center py-3">
                  <div className="w-10/12 flex items-center">
                    <div className="w-2/12">
                      <img
                        src={item?.product?.imageCover}
                        className="p-2 w-full rounded"
                        alt={item?.product?.title}
                      />
                    </div>
                    <div className="w-10/12 px-3">
                      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                        {item?.product?.title}
                      </h2>
                      <h2 className="text-green-700 text-xl">Price: {item.price} EGP</h2>
                      <button
                        onClick={() => handleDeleteItem(item?.product?._id)}
                        className="border p-2 border-red-700 rounded text-red-700 hover:bg-red-700 hover:text-white mt-2 transition"
                      >
                        <i className="fa-solid fa-trash-can mr-2"></i> Remove
                      </button>
                    </div>
                  </div>
                  <div className="w-2/12 flex items-center justify-center">
                    <i
                      onClick={() => updateCartItemHandler(item?.product?._id, item.count + 1)}
                      className="fa-solid fa-plus cursor-pointer border border-green-700 rounded mx-2 p-2 hover:bg-green-700 hover:text-white transition"
                    ></i>
                    <span className="mx-2 text-lg font-bold">{item.count}</span>
                    <i
                      onClick={() => updateCartItemHandler(item?.product?._id, item.count - 1)}
                      className="fa-solid fa-minus cursor-pointer border border-green-700 rounded mx-2 p-2 hover:bg-green-700 hover:text-white transition"
                    ></i>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Link
            to={`/Shipping_Details/${cartData._id}`}
            className="text-center block text-2xl text-white w-full bg-green-700 py-2 my-3 rounded-lg hover:bg-green-800 transition"
          >
            Proceed to Pay <i className="fab fa-cc-visa text-2xl text-white"></i>
          </Link>
        </div>
      ) : (
        // تصميم جميل للحالة الفارغة مع دعم الوضع الداكن والفاتح
        <div className="flex flex-col justify-center items-center h-screen bg-gray-100 dark:bg-gray-800 px-4">
          <img
            src={empty_cart}
            alt="Empty Cart"
            className="w-full max-w-sm mx-auto object-contain mb-6 rounded-full"
          />
          <h2 className="text-3xl font-bold text-gray-700 dark:text-gray-200 mb-2">
            Your Cart is Empty
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 mb-6">
            Looks like you haven't added any items yet.
          </p>
          <Link
            to="/"
            className="bg-unhover-button hover:bg-main text-white px-6 py-3 rounded-full text-xl transition"
          >
            Start Shopping
          </Link>
        </div>
      )}
    </>
  );
}
