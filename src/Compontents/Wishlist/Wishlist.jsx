import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  // استدعاء البيانات عند تحميل الصفحة
  useEffect(() => {
    getWishlist();
  }, []);

  function getWishlist() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/wishlist")
      .then((res) => {
        setWishlist(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching wishlist:", error);
      });
  }

  function removeFromWishlist(productId) {
    axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`)
      .then(() => {
        setWishlist((prev) => prev.filter((item) => item._id !== productId));
      })
      .catch((error) => {
        console.error("Error removing from wishlist:", error);
      });
  }

  return (
    <div className="w-10/12 mx-auto my-6">
      <h2 className="text-2xl font-bold mb-6">My Wishlist</h2>

      {wishlist.length === 0 ? (
        <p className="text-gray-500">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((product) => {
            const { _id, title, imageCover, price, ratingAverage } = product;

            return (
              <div key={_id} className="p-4 shadow-md border rounded-md space-y-3">
                <Link to={`/ProductDetails/${_id}/${title}`}>
                  <img src={imageCover} className="w-full" alt={title} />
                  <h2 className="text-lg font-bold">{title}</h2>
                  <div className="flex justify-between items-center">
                    <p className="text-gray-700 font-medium">{price} EGP</p>
                    <span className="text-yellow-500 font-semibold flex items-center">
                      <i className="fa-solid fa-star mr-1"></i>
                      {ratingAverage}
                    </span>
                  </div>
                </Link>

                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md w-full mt-3 hover:bg-red-700"
                  onClick={() => removeFromWishlist(_id)}
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
