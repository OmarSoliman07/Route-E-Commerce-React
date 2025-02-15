import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Slider from 'react-slick'; // or the correct path to your Slider component

export default function ProductDetails() {
  const { x, y } = useParams();
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
    return <div>Product not found</div>;
  }
  function ChangeImage(e) {
   let imgSrc = e.target.getAttribute('src');
   document.getElementById('myImage').setAttribute('src', imgSrc);
  }

  return (
    <div className='w-10/12 mx-auto my-5'>
        <div className='flex justify-between '>
      <div className='w-3/12'>
       
            <img src={product?.imageCover} id='myImage' className='w-full mb-4' alt={product?.title} />
      
        <div className='flex'>
                {product?.images?.map((image, i) => (
              <div key={i} className='mx-1 '>
                <img onClick={ChangeImage} src={image} className='w-full ' alt={product.title} />
              </div>
          ))}
        </div>
    
       
      </div>
      <div className='w-8/12 flex flex-col justify-center '>
        <h1 className='my-3'>{product.title}</h1>
        <p className='text-gray-600 dark:text-gray-400'>{product.description}</p>
           <div className='flex justify-between my-5'>
              <h2>{product?.price} egp</h2>
                <span>
                  <i className="fa-solid fa-star text-yellow-300"></i>
                  {product?.ratingsAverage}
                </span>
           </div>
              
              <button className="bg-main border border-transparent px-2 text-white mt-5 ">
                Add To Cart
              </button>
              </div>
      </div>
    </div>
   
  );
}