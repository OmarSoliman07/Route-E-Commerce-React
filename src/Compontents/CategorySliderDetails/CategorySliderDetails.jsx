import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Cartcontext } from "../../Context/CartContextProveder";
import { MyWishlistContext } from "../../Context/MywishListContextProveder";
import toast, { Toaster } from "react-hot-toast";

export default function CategorySliderDetails() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(true);
  const { addUserCart, setnumsCartItems } = useContext(Cartcontext);
  const { postUrll, deleteUrl, getUrl } = useContext(MyWishlistContext);
  
  const [wishlistIds, setWishlistIds] = useState([]);

 
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get("https://ecommerce.routemisr.com/api/v1/products/");
        const filteredProducts = res.data.data.filter(
          (product) => product.category?._id === id
        );
        setProducts(filteredProducts);
        if (filteredProducts.length > 0) {
          setCategoryName(filteredProducts[0].category.name);
        }
      } catch (error) {
        console.error("Error fetching category products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [id]);

 
  useEffect(() => {
    getUrl()
      .then((res) => {
        const wishlistData = res.data.data;
        setWishlistIds(wishlistData.map(item => item._id));
      })
      .catch((err) => console.error("Error fetching wishlist:", err));
  }, [getUrl]);

  function addCart(productId) {
    addUserCart(productId)
      .then((res) => {
        setnumsCartItems(res.data.numOfCartItems);
        toast.success("Added to cart successfully");
      })
      .catch((err) => console.error("Error adding to cart:", err));
  }

  
  function toggleWishlist(e, productId) {
    e.preventDefault();
    e.stopPropagation();
    if (!wishlistIds.includes(productId)) {
     
      postUrll(productId)
        .then(() => {
          setWishlistIds(prev => [...prev, productId]);
          toast.success("Added to wishlist");
        })
        .catch((err) => {
          console.error("Error adding to wishlist:", err);
          toast.error("Failed to add to wishlist");
        });
    } else {
    
      deleteUrl(productId)
        .then(() => {
          setWishlistIds(prev => prev.filter(id => id !== productId));
          toast.success("Removed from wishlist");
        })
        .catch((err) => {
          console.error("Error removing from wishlist:", err);
          toast.error("Failed to remove from wishlist");
        });
    }
  }

  return (
    <>
      <Toaster />
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <span className="loader"></span>
        </div>
      ) : (
        <div className="p-5">
          <h2 className="text-2xl font-bold mb-5">{categoryName || "Category"}</h2>
          {products.length === 0 ? (
            <p>No products found for this category.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="p-4 mt-4 shadow-md dark:shadow-[0_4px_6px_rgba(255,255,255,0.1)] hover:border border-main duration-500 group overflow-hidden space-y-3"
                >
                  <Link to={`/ProductDetails/${product._id}/${product.title}`}>
                    <div className="relative">
                      <img src={product.imageCover} className="w-full" alt={product.title} />
                    
                    </div>
                    <h5 className="text-main font-semibold">{product.category?.name}</h5>
                    <div className="flex justify-between">
                  <h2 className="text-lg font-bold">
                    {product?.title.split(" ").slice(0, 2).join(" ")}
                  </h2>
                   <button
                  onClick={(e) => toggleWishlist(product?._id, e)}
                  className=""
                >
                  <i
                    className={`fa-solid fa-heart text-2xl ${
                      wishlistIds.includes(product?._id)
                        ? "text-red-500"
                        : "text-gray-400"
                    }`}
                  ></i>
                </button>

                  </div>
                    <div className="flex justify-between items-center">
                      <p className="text-gray-700 font-medium dark:text-gray-400">
                        {product.price} EGP
                      </p>
                      <span className="text-yellow-500 font-semibold flex items-center">
                        <i className="fa-solid fa-star mr-1"></i>
                        {product.ratingAverage}
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        addCart(product._id);
                      }}
                      className="bg-unhover-button border border-transparent px-4 py-2 mt-5 text-white translate-y-24 group-hover:translate-y-0 duration-500 rounded-md w-full hover:bg-main"
                    >
                      Add To Cart
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
