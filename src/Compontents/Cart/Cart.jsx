import React, { useContext, useEffect, useState } from "react";
import { Cartcontext } from "../../Context/CartContextProveder";
import { MyWishlistContext } from "../../Context/MywishListContextProveder";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import empty_cart from "../../assets/images/Empty Cart Image.avif";

export default function Cart() {
  const {
    getUserCart,
    deleteItem,
    setnumsCartItems,
    clearCart,
    updateCartItem,
  } = useContext(Cartcontext);
  const { postUrll, deleteUrl, getUrl } = useContext(MyWishlistContext);
  const [cartData, setCartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [wishlistIds, setWishlistIds] = useState([]);

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


  useEffect(() => {
    getUrl()
      .then((res) => {
        const wishlistItems = res.data.data;
        setWishlistIds(wishlistItems.map((item) => item._id));
      })
      .catch((err) => console.error("Error fetching wishlist:", err));
  }, [getUrl]);

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


  function toggleWishlist(productId, e) {
    e.preventDefault();
    if (!wishlistIds.includes(productId)) {
      postUrll(productId)
        .then(() => {
          setWishlistIds((prev) => [...prev, productId]);
          toast.success("Added to wishlist");
        })
        .catch((err) => {
          console.error("Error adding to wishlist:", err);
          toast.error("Failed to add to wishlist");
        });
    } else {
      deleteUrl(productId)
        .then(() => {
          setWishlistIds((prev) => prev.filter((id) => id !== productId));
          toast.success("Removed from wishlist");
        })
        .catch((err) => {
          console.error("Error removing from wishlist:", err);
          toast.error("Failed to remove from wishlist");
        });
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
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 text-center sm:text-left">
              Shopping Cart
            </h2>
            <div className="flex flex-col sm:flex-row justify-between items-center mt-3">
              <h2 className="text-2xl text-lime-700 text-center sm:text-left">
                Total Cart Price: {cartData?.totalCartPrice} EGP
              </h2>
              <button
                onClick={handleClearCart}
                className="border p-2 text-lg border-red-700 rounded bg-red-700 text-white hover:bg-red-800 transition w-full sm:w-auto mt-2 sm:mt-0"
              >
                Clear Cart
              </button>
            </div>

            <div className="divide-y-2 divide-gray-500 mt-5">
              {cartData?.products?.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col sm:flex-row items-center py-3"
                >
                  <div className="w-full sm:w-10/12 flex flex-col sm:flex-row items-center">
                    <div className="w-full sm:w-2/12">
                      <img
                        src={item?.product?.imageCover}
                        className="p-2 w-full rounded"
                        alt={item?.product?.title}
                      />
                    </div>
                    <div className="w-full sm:w-10/12 px-3 text-center sm:text-left">
                      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                        {item?.product?.title}
                      </h2>
                      <h2 className="text-green-700 text-lg">
                        Price: {item.price} EGP
                      </h2>
                    
                      <div className="hidden sm:flex gap-2 mt-2">
                        <button
                          onClick={() =>
                            handleDeleteItem(item?.product?._id)
                          }
                          className="border p-2 border-red-700 rounded text-red-700 hover:bg-red-700 hover:text-white transition"
                        >
                          <i className="fa-solid fa-trash-can mr-2"></i> Remove
                        </button>
                      </div>
                    
                      <div className="flex sm:hidden gap-2 mt-2 justify-between">
                        <button
                          onClick={() =>
                            handleDeleteItem(item?.product?._id)
                          }
                          className="border p-2 border-red-700 rounded text-red-700 hover:bg-red-700 hover:text-white transition"
                        >
                          <i className="fa-solid fa-trash-can mr-2"></i> Remove
                        </button>
                        <button
                          onClick={(e) =>
                            toggleWishlist(item?.product?._id, e)
                          }
                          className="p-2 hover:bg-gray-400 hover:text-white transition"
                        >
                          <i
                            className={`fa-solid fa-heart text-2xl ${
                              wishlistIds.includes(item?.product?._id)
                                ? "text-red-500"
                                : "text-gray-400"
                            }`}
                          ></i>
                        </button>
                      </div>
                    </div>
                  </div>
             
                  <div className="w-full sm:w-2/12 flex flex-col items-center justify-center mt-2 sm:mt-0">
                    <div className="flex items-center">
                      <i
                        onClick={() =>
                          updateCartItemHandler(
                            item?.product?._id,
                            item.count + 1
                          )
                        }
                        className="fa-solid fa-plus cursor-pointer border border-green-700 rounded mx-2 p-2 hover:bg-green-700 hover:text-white transition"
                      ></i>
                      <span className="mx-2 text-lg font-bold">{item.count}</span>
                      <i
                        onClick={() =>
                          updateCartItemHandler(
                            item?.product?._id,
                            item.count - 1
                          )
                        }
                        className="fa-solid fa-minus cursor-pointer border border-green-700 rounded mx-2 p-2 hover:bg-green-700 hover:text-white transition"
                      ></i>
                    </div>
                   
                    <div className="hidden sm:block mt-4">
                      <button
                        onClick={(e) =>
                          toggleWishlist(item?.product?._id, e)
                        }
                        className="p-2 hover:bg-gray-400 hover:text-white transition"
                      >
                        <i
                          className={`fa-solid fa-heart text-2xl ${
                            wishlistIds.includes(item?.product?._id)
                              ? "text-red-500"
                              : "text-gray-400"
                          }`}
                        ></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Link
            to={`/Shipping_Details/${cartData._id}`}
            className="text-center block text-2xl text-white w-full bg-unhover-button py-2 my-3 rounded-lg hover:bg-main transition"
          >
            Proceed to Pay <i className="fab fa-cc-visa text-2xl text-white"></i>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center h-screen bg-gray-100 dark:bg-gray-800 px-4">
          <img
            src={empty_cart}
            alt="Empty Cart"
            className="w-full max-w-sm mx-auto object-contain mb-6 rounded-full"
          />
          <h2 className="text-3xl font-bold text-gray-700 dark:text-gray-200 mb-2 text-center">
            Your Cart is Empty
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 mb-6 text-center">
            Looks like you haven't added any items yet.
          </p>
          <Link
            to="/"
            className="bg-unhover-button hover:bg-main text-white px-6 py-3 rounded-full text-xl transition w-full sm:w-auto text-center"
          >
            Start Shopping
          </Link>
        </div>
      )}
    </>
  );
}
