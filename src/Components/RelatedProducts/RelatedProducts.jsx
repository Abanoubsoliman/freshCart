import React from 'react'
import Product from '../Product/Proudct'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
;

export default function RelatedProducts({ relatedProduct }) {
  const settings = {
    dots: true,
    infinite: false,
    speed: 700,
    slidesToShow: 5,
    slidesToScroll: 4,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1


        }
      }
    ]

  };
  return (
    <Slider {...settings} className="container w-full  flex flex-row justify-center items-center">
      {relatedProduct.map(product => (
        <div key={product._id} className="px-2 "><Product  product={product} /></div>
      ))}
    </Slider>
  )
}
