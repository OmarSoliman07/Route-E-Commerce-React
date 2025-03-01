import React, { useEffect, useState, useRef, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Cartcontext } from "../../Context/CartContextProveder";
import toast, { Toaster } from "react-hot-toast";

export default function ProductDetails() {
  const { x } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const sliderRef = useRef(null);
  const { addUserCart, setnumsCartItems } = useContext(Cartcontext);

  useEffect(() => {
    setLoading(true);
    window.scrollTo(0, 0);

    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${x}`)
      .then((response) => {
        const productData = response.data.data;
        setProduct(productData);
        setLoading(false);

        const categoryId = productData.category._id;
        axios
          .get(`https://ecommerce.routemisr.com/api/v1/products?category=${categoryId}`)
          .then((res) => {
            const filteredProducts = res.data.data.filter((item) => item._id !== x);
            setRelatedProducts(filteredProducts.slice(0, 10));
          })
          .catch((err) => console.error("Error fetching related products:", err));
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
        setLoading(false);
      });
  }, [x]);

  function addCart(id) {
    addUserCart(id)
      .then((res) => {
        // تحديث العداد باستخدام القيمة الراجعة من الـ API
        setnumsCartItems(res.data.numOfCartItems);
        toast.success("Added to cart successfully");
      })
      .catch((err) => console.error("Error adding to cart:", err));
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loader"></span>
      </div>
    );
  }

  if (!product) {
    return <div className="text-center text-red-500">Product not found</div>;
  }

  const sliderSettings = {
    slidesToShow: 3,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          autoplay: true,
          arrows: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          autoplay: true,
          arrows: false,
        },
      },
    ],
  };

  return (
    <>
      <Toaster />
      <div className="w-11/12 mx-auto my-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col items-center">
            <img
              src={product?.imageCover}
              className="w-full max-w-md object-cover rounded-lg shadow-lg"
              alt={product?.title}
            />
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="text-2xl font-semibold">{product.title}</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">{product.description}</p>
            <div className="flex justify-between items-center my-5">
              <h2 className="text-xl font-bold">{product?.price} EGP</h2>
              <span className="flex items-center text-yellow-400">
                <i className="fa-solid fa-star mr-1"></i> {product?.ratingsAverage}
              </span>
            </div>
            <button
              onClick={() => addCart(product._id)}
              className="bg-unhover-button hover:bg-main text-white py-2 px-4 rounded-lg mt-4 transition-all"
            >
              Add To Cart
            </button>
          </div>
        </div>

        <div className="my-5 mt-10 relative">
          {/* زر السهم الأيسر */}
          <button
            className="hidden sm:block absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 p-2 rounded-full text-white hover:bg-gray-600 dark:bg-gray-300 dark:text-black dark:hover:bg-gray-500"
            onClick={() => sliderRef.current.slickPrev()}
          >
            <i className="fas fa-chevron-left"></i>
          </button>

          <h2 className="text-xl font-bold mb-4">Related Products</h2>

          {/* السلايدر مع تمرير الإعدادات الصحيحة */}
          <Slider ref={sliderRef} {...sliderSettings}>
            {relatedProducts.map((item) => (
              <div key={item._id} className="p-2 cursor-pointer">
                <Link to={`/ProductDetails/${item._id}/${encodeURIComponent(item.title)}`}>
                  <div className="border rounded-lg p-3 shadow-lg text-center group overflow-hidden">
                    <img src={item.imageCover} className="w-full object-cover h-48 rounded-lg" alt={item.title} />
                    <h2 className="text-lg font-bold">{item.title.split(" ").slice(0, 2).join(" ")}</h2>
                    <div className="flex justify-between items-center">
                      <p className="text-gray-700 font-medium dark:text-gray-400">{item.price} EGP</p>
                      <span className="text-yellow-500 font-semibold flex items-center">
                        <i className="fa-solid fa-star mr-1"></i> {item.ratingsAverage}
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        addCart(item._id);
                      }}
                      className="bg-unhover-button border border-transparent px-4 py-2 mt-5 text-white translate-y-24 group-hover:translate-y-0 duration-500 rounded-md w-full hover:bg-main"
                    >
                      Add To Cart
                    </button>
                  </div>
                </Link>
              </div>
            ))}
          </Slider>

          {/* زر السهم الأيمن */}
          <button
            className="hidden sm:block absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 p-2 rounded-full text-white hover:bg-gray-600 dark:bg-gray-300 dark:text-black dark:hover:bg-gray-500"
            onClick={() => sliderRef.current.slickNext()}
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </>
  );
}
