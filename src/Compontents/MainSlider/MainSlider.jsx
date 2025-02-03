import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import slideimg1 from "../../assets/images/slider-image-1.jpeg";
import slideimg2 from "../../assets/images/slider-image-2.jpeg";
import slideimg3 from "../../assets/images/slider-image-3.jpeg";
import slideimg4 from "../../assets/images/slider-2.jpeg";
import slideimg5 from "../../assets/images/grocery-banner-2.jpeg";

export default function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    
  };
  return (
   <div className="flex"> 
   <div className="w-9/12">
 <Slider {...settings}  > 
      <div>
       <img src={slideimg1} className="w-full h-96" alt="" />
      </div>
      <div>
        <img src={slideimg2} className="w-full h-96" alt="" />
      </div>
      <div>
       <img src={slideimg3} className="w-full h-96" alt="" />
      </div>
     
    </Slider>
   </div>
   <div className="w-3/12">
 <div>
       <img src={slideimg4} className="w-full h-48 object-fill" alt="" />
      </div> 
      
      <div>
       <img src={slideimg5} className="w-full h-48 object-fill" alt="" />
      </div>
   </div>

   </div>
  );
}