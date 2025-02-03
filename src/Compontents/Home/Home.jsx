import { useEffect, useState } from "react";
import axios from "axios";
import MainSlider from "../MainSlider/MainSlider";
import CategorySlider from "../CategorySlider/CategorySlider";
import { Link } from "react-router-dom";

export default function Home() {
  const [productList, setProductList] = useState([]);
  const [numsPages, setNumsPages] = useState([]); 
  const [currentPage, setCurrentPage] = useState(1); 
  const [loading, setloading] = useState(1); 
  const limit = 24; 

  function getProductList(page = 1) {
    setloading(true);
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products?limit=${limit}&page=${page}`)
      .then((res) => {
        setProductList(res.data.data);

        
        if (res.data.metadata && res.data.metadata.numberOfPages) {
          setNumsPages(Array.from({ length: res.data.metadata.numberOfPages }, (_, i) => i + 1));
          
        }
    })
    .catch((error) => {
      console.error("Error fetching product data:", error);
    })
    .finally(() => {
      setloading(false);
    });
  }

  useEffect(() => {
    getProductList(currentPage);
  }, [currentPage]); 

  return (
   <>
   {loading? <div className=" flex justify-center items-center h-screen">
    <span class="loader"></span>

   </div>:  <div className="w-10/12 mx-auto my-6">
    <MainSlider />
    <CategorySlider />
      <div className="flex flex-wrap">
        {productList.map((product) => {
          const { _id, title, imageCover, price, ratingAverage, category } = product;
          const { name } = category;

          return (
            <div key={_id} className="lg:w-2/12 md:w-3/12 sm:w-6/12 p-2 mb-2 hover:border border-main duration-500 group overflow-hidden">
             <Link to={`/ProductDetails/${_id}/${title}`}>
              <img src={imageCover} className="w-full" alt={title} />
              <h5 className="text-main">{name}</h5>
              <h2>{title.split(" ").slice(0, 2).join(" ")}</h2>
              <div className="flex justify-between">
                <p>{price} egp</p>
                <span>
                  <i className="fa-solid fa-star text-yellow-300"></i>
                  {product?.ratingsAverage}
                </span>
              </div>
              <button className="bg-main border border-transparent px-2 text-white translate-y-24 group-hover:translate-y-0 duration-500">
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
              className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
              disabled={currentPage === 1}
            >
              Previous
            </button>
          </li>

          {numsPages.map((el) => (
            <li key={el}>
              <button
                onClick={() => setCurrentPage(el)}
                className={`flex items-center justify-center px-4 h-10 leading-tight ${
                  currentPage === el ? "bg-main text-white" : "text-gray-500 bg-white"
                } border border-gray-300 hover:bg-gray-100 hover:text-gray-700`}
              >
                {el}
              </button>
            </li>
          ))}

          <li>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, numsPages.length))}
              className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
              disabled={currentPage === numsPages.length}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>}
  
   
   </>
  );
}
