import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { useState, useContext } from "react";
import axios from "axios";
import MainSlider from "../MainSlider/MainSlider";
import CategorySlider from "../CategorySlider/CategorySlider";
import { Link } from "react-router-dom";
import { Cartcontext } from "../../Context/CartContextProveder";
import toast, { Toaster } from "react-hot-toast";

// إنشاء instance من QueryClient
const queryClient = new QueryClient();

function HomeComponent() {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 24;
  const { addUserCart, setnumsCartItems } = useContext(Cartcontext);

  const { data, error, isLoading, isError } = useQuery(
    ["products", currentPage],
    () =>
      axios
        .get(`https://ecommerce.routemisr.com/api/v1/products?limit=${limit}&page=${currentPage}`)
        .then((res) => res.data),
    {
      keepPreviousData: true,
      staleTime: 5 * 60 * 1000, // 5 دقائق
    }
  );

  const numsPages = data?.metadata?.numberOfPages
    ? Array.from({ length: data.metadata.numberOfPages }, (_, i) => i + 1)
    : [];

  function addCart(id) {
    addUserCart(id)
      .then((res) => {
        setnumsCartItems(res.data.numOfCartItems);
        toast.success("Added to cart successfully");
      })
      .catch((err) => console.error("Error adding to cart:", err));
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loader"></span>
      </div>
    );
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <Toaster />
      <div className="w-10/12 mx-auto my-6">
        <MainSlider />
        <CategorySlider />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {data.data.map((product) => {
            const { _id, title, imageCover, price, ratingAverage, category } = product;
            const { name } = category;

            return (
              <div
                key={_id}
                className="p-4 mt-14 shadow-md dark:shadow-[0_4px_6px_rgba(255,255,255,0.1)] hover:border border-main duration-500 group overflow-hidden space-y-3"
              >
                <Link to={`/ProductDetails/${_id}/${title}`}>
                  <img src={imageCover} className="w-full" alt={title} />
                  <h5 className="text-main font-semibold">{name}</h5>
                  <h2 className="text-lg font-bold">{title.split(" ").slice(0, 2).join(" ")}</h2>
                  <div className="flex justify-between items-center">
                    <p className="text-gray-700 font-medium dark:text-gray-400">{price} EGP</p>
                    <span className="text-yellow-500 font-semibold flex items-center">
                      <i className="fa-solid fa-star mr-1"></i>
                      {ratingAverage}
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      addCart(_id);
                    }}
                    className="bg-unhover-button border border-transparent px-4 py-2 mt-5 text-white translate-y-24 group-hover:translate-y-0 duration-500 rounded-md w-full hover:bg-main"
                  >
                    Add To Cart
                  </button>
                </Link>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        <nav className="flex justify-center mt-7" aria-label="Page navigation example">
          <ul className="inline-flex -space-x-px text-base h-10">
            <li>
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className="dark:bg-gray-900 dark:text-white dark:hover:bg-slate-700 flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
                disabled={currentPage === 1}
              >
                Previous
              </button>
            </li>

            {numsPages.map((el) => (
              <li key={el}>
                <button
                  onClick={() => setCurrentPage(el)}
                  className={`flex items-center justify-center px-4 h-10 leading-tight border border-gray-300 
                    ${
                      currentPage === el
                        ? "bg-main text-white hover:bg-main hover:text-white dark:bg-main dark:text-white dark:hover:bg-main"
                        : "text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-900 dark:text-white dark:hover:bg-slate-700 dark:hover:text-gray-300"
                    }`}
                >
                  {el}
                </button>
              </li>
            ))}

            <li>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, numsPages.length))}
                className="dark:bg-gray-900 dark:text-white dark:hover:bg-slate-700 flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
                disabled={currentPage === numsPages.length}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <HomeComponent />
    </QueryClientProvider>
  );
}
