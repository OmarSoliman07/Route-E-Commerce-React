import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function CategoryProducts() {
  let { id } = useParams();
  let navigate = useNavigate();
  let [subcategories, setSubcategories] = useState([]);
  let [products, setProducts] = useState([]);
  let [loading, setLoading] = useState(true);


  useEffect(() => {
    axios.get(`https://ecommerce.routemisr.com/api/v1/subcategories?category=${id}`)
      .then((res) => setSubcategories(res.data.data))
      .catch((error) => console.error("Error fetching subcategories:", error));
  }, [id]);

 
  useEffect(() => {
    if (subcategories.length > 0) {
      let productsRequests = subcategories.map(sub =>
        axios.get(`https://ecommerce.routemisr.com/api/v1/products?subcategory=${sub._id}`)
      );

      Promise.all(productsRequests)
        .then(responses => {
          let allProducts = responses.flatMap(res => res.data.data);
          setProducts(allProducts);
        })
        .catch(error => console.error("Error fetching products:", error))
        .finally(() => setLoading(false));
    }
  }, [subcategories]);

  return (
    <div className="container mx-auto my-10">
      <h2 className="text-2xl font-bold mb-5">Category Products</h2>

      
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <span className="loader"></span>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {products.length > 0 ? (
            products.map((product) => (
              <div 
                key={product._id} 
                className="border p-4 rounded-lg shadow-md cursor-pointer"
                onClick={() => navigate(`/ProductDetails/${product._id}`)}
              >
                <img src={product.imageCover} alt={product.title} className="h-40 w-full object-cover mb-2"/>
                <h3 className="text-lg font-semibold">{product.title}</h3>
                <p className="text-gray-500">${product.price}</p>
              </div>
            ))
          ) : (
            <p className="text-center col-span-4 text-gray-500">No products found for this category.</p>
          )}
        </div>
      )}
    </div>
  );
}
