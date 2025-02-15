import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import slideimg1 from "../../assets/images/slider-image-1.jpeg";
import slideimg2 from "../../assets/images/slider-image-2.jpeg";
import slideimg3 from "../../assets/images/slider-image-3.jpeg";
import slideimg6 from "../../assets/images/Slider-img-4.jpg";
import slideimg7 from "../../assets/images/Slider-img-5.jpg";

export default function MainSlider() {
  var settings = {
    infinite: true,
    autoplay: true,
    speed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: true, // الـ dots مفعّلة في الوضع العادي
    responsive: [
      {
        breakpoint: 640, // أقل من 640px (شاشات small)
        settings: {
          dots: false, // إخفاء النقاط في الشاشات الصغيرة
        },
      },
    ],
  };

  return (
    <div className="flex flex-col sm:flex-row">
      {/* Slider Section */}
      <div className="w-full sm:w-9/12">
        <Slider {...settings}>
          <div>
            <img src={slideimg1} className="w-full h-96" alt="slide-img1" />
          </div>
          <div>
            <img src={slideimg2} className="w-full h-96" alt="slide-img2" />
          </div>
          <div>
            <img src={slideimg3} className="w-full h-96" alt="slide-img3" />
          </div>
        </Slider>
      </div>

      {/* Side Images Section */}
      <div className="w-full sm:w-3/12 mt-4 sm:mt-0">
        <div>
          <img
            src={slideimg6}
            className="w-full h-48 sm:h-48 object-cover sm:object-fill"
            alt="slide-img4"
          />
        </div>
        <div>
          <img
            src={slideimg7}
            className="w-full h-48 sm:h-48 object-cover sm:object-fill"
            alt="slide-img5"
          />
        </div>
      </div>
    </div>
  );
}
