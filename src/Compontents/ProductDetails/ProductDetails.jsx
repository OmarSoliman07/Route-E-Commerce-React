import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function ProductDetails() {
  const { x } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${x}`)
      .then((response) => {
        setProduct(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching product details:', error);
        setLoading(false);
      });
  }, [x]);

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

  function ChangeImage(e) {
    let imgSrc = e.target.getAttribute('src');
    document.getElementById('myImage').setAttribute('src', imgSrc);
  }

  return (
    <div className="w-11/12 mx-auto my-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* قسم الصور */}
        <div className="flex flex-col items-center">
          <img 
            src={product?.imageCover} 
            id="myImage" 
            className="w-full max-w-md object-cover rounded-lg shadow-lg " 
            alt={product?.title} 
          />
          
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {product?.images?.map((image, i) => (
              <img 
                key={i} 
                onClick={ChangeImage} 
                src={image} 
                className="w-16 h-16 object-cover rounded cursor-pointer border border-gray-300 hover:border-gray-500 transition-all"
                alt={product?.title} 
              />
            ))}
          </div>
        </div>

        {/* تفاصيل المنتج */}
        <div className="flex flex-col justify-center">
          <h1 className="text-2xl font-semibold">{product.title}</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">{product.description}</p>

          <div className="flex justify-between items-center my-5">
            <h2 className="text-xl font-bold">{product?.price} EGP</h2>
            <span className="flex items-center text-yellow-400">
              <i className="fa-solid fa-star mr-1"></i> {product?.ratingsAverage}
            </span>
          </div>

          <button className="bg-unhover-button hover:bg-main text-white  py-2 px-4 rounded-lg mt-4 transition-all">
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}
