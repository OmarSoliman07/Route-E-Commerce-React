import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Slider from 'react-slick/lib/slider'
import { useNavigate } from 'react-router-dom'

export default function CategorySlider() {
  let [categoryList, setCategoryList] = useState([])
  let navigate = useNavigate();

  function GetAllCategory() {
    axios.get('https://ecommerce.routemisr.com/api/v1/categories')
      .then((res) => {
        setCategoryList(res.data.data)
      })
      .catch((error) => {
        console.error("There was an error fetching the categories!", error);
      });
  }

  useEffect(() => { GetAllCategory() }, [])

  // إعدادات الـ Slider مع التكيف مع أحجام الشاشات
  const sliderSettings = {
    slidesToShow: 6,
    infinite: true,
    autoplay: true,
    speed: 500,
    arrows: false,
    slidesToScroll: 6,
    responsive: [
      {
        breakpoint: 1024, // للأجهزة اللوحية وما أصغر
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 600, // للهواتف الصغيرة جدًا
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        }
      }
    ]
  };

  return (
    <div className='my-5 mt-10'>
      <Slider {...sliderSettings}>
        {categoryList?.map((category) => {
          return (
            <div key={category._id} 
            // className="cursor-pointer" onClick={() => navigate(`/category/${category._id}`)}
            >
              <img src={category.image} className='h-48 w-full object-cover object-top' alt={category.name} />
              <h5 className='text-center'> {category.name}</h5>
            </div>
          )
        })}
      </Slider>
    </div>
  )
}
