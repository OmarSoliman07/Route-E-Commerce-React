import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';

export default function CategorySlider() {
  let [categories, setCategories] = useState([]);
  let navigate = useNavigate();
  let sliderRef = useRef(null); // 🔹 استخدام ref للتحكم في السلايدر

  function GetAllProducts() {
    axios
      .get('https://ecommerce.routemisr.com/api/v1/products/')
      .then((res) => {
        let categoryMap = new Map();
        res.data.data.forEach((product) => {
          if (!categoryMap.has(product.category._id)) {
            categoryMap.set(product.category._id, product.category);
          }
        });
        setCategories(Array.from(categoryMap.values()));
      })
      .catch((error) => {
        console.error('There was an error fetching the products!', error);
      });
  }

  useEffect(() => {
    GetAllProducts();
  }, []);

  const sliderSettings = {
    slidesToShow: 3,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToScroll: 1,
    arrows: false, // ❌ تعطيل الأسهم الافتراضية
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
    <div className="my-5 mt-10 relative">
      {/* 🔹 زر السهم الأيسر - مخفي في الموبايل */}
      <button
        className="hidden sm:block absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 p-2 rounded-full text-white hover:bg-gray-600 dark:bg-gray-300 dark:text-black dark:hover:bg-gray-500"
        onClick={() => sliderRef.current.slickPrev()} // 🔹 التحكم في السلايدر
      >
        <i className="fas fa-chevron-left"></i>
      </button>

      {/* 🔹 زر السهم الأيمن - مخفي في الموبايل */}
      <button
        className="hidden sm:block absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 p-2 rounded-full text-white hover:bg-gray-600 dark:bg-gray-300 dark:text-black dark:hover:bg-gray-500"
        onClick={() => sliderRef.current.slickNext()} // 🔹 التحكم في السلايدر
      >
        <i className="fas fa-chevron-right"></i>
      </button>

      {/* 🔹 السلايدر */}
      <Slider ref={sliderRef} {...sliderSettings}>
        {categories.map((category) => (
          <div
            key={category._id}
            className="cursor-pointer"
            onClick={() => navigate(`/CategorySliderDetails/${category._id}`)}
          >
            <img
              src={category.image}
              className="h-64 w-full object-cover object-top"
              alt={category.name}
            />
            <h5 className="text-center">{category.name}</h5>
          </div>
        ))}
      </Slider>
    </div>
  );
}
