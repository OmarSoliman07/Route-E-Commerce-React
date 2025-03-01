import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MyWishlistContext } from "../../Context/MywishListContextProveder";

export default function Wishlist() {
  const { getUrl, deleteUrl } = useContext(MyWishlistContext);
  const [wishlist, setWishlist] = useState([]);

  
  useEffect(() => {
    getUrl()
      .then((res) => {
        setWishlist(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching wishlist:", error);
      });
  }, [getUrl]);

  
  function removeFromWishlist(productId) {
    deleteUrl(productId)
      .then(() => {
        setWishlist((prev) => prev.filter((item) => item._id !== productId));
      })
      .catch((error) => {
        console.error("Error removing from wishlist:", error);
      });
  }

  return (
    <div className="w-10/12 mx-auto my-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">My Wishlist</h2>
      {wishlist.length === 0 ? (
        <p className="text-gray-500">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((product) => {
            const { _id, title, imageCover, price, ratingAverage, category } = product;
            const categoryName = category ? category.name : "";
            return (
              <div
                key={_id}
                className="p-4 mt-14 shadow-md dark:shadow-[0_4px_6px_rgba(255,255,255,0.1)] hover:border border-main duration-500 group overflow-hidden space-y-3 relative"
              >
                <Link to={`/ProductDetails/${_id}/${title}`}>
                  <img src={imageCover} className="w-full" alt={title} />
                  {categoryName && (
                    <h5 className="text-main font-semibold">{categoryName}</h5>
                  )}
                  <h2 className="text-lg font-bold">
                    {title.split(" ").slice(0, 2).join(" ")}
                  </h2>
                  <div className="flex justify-between items-center">
                    <p className="text-gray-700 font-medium dark:text-gray-400">
                      {price} EGP
                    </p>
                    <span className="text-yellow-500 font-semibold flex items-center">
                      <i className="fa-solid fa-star mr-1"></i>
                      {ratingAverage}
                    </span>
                  </div>
                </Link>
                <button
                  onClick={() => removeFromWishlist(_id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md w-full mt-3 hover:bg-red-700 transition"
                >
                  Remove from Wishlist
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
