import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import LoadingScreen from '../../LoadingScreen/LoadingScreen';
import Slider from "react-slick";
import RelatedProducts from '../../RelatedProducts/RelatedProducts';
import { addToCart } from '../../../Services/CartServices';
import { Button } from '@heroui/react';
import { addToWishlist } from '../../../Services/AddWishlist';




export default function ProductDetails() {
  let { id } = useParams()
  const [productDetails, setProductDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [addToCartLoading, setAddToCartLoading] = useState(false);
  const [addToWishlistLoading, setAddToWishlistLoading] = useState(false);


  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,

  };
  useEffect(() => {
    getProductDetails()
  }, [id]);
  function getProductDetails() {
    setIsLoading(true)
    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then(({ data }) => {
        setProductDetails(data.data);
        getRelatedProducts(data.data.category._id)
        setIsLoading(false)
      })

  }
  async function getRelatedProducts(CategoryId) {

    const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?category=${CategoryId}`);
    setRelatedProduct(data.data)


  }
  if (isLoading) {
    return <LoadingScreen />
  }
  return (
    <>

      <div className=" mx-auto rounded-lg shadow-lg bg-white p-6  ">
        <div className=" grid  xl:grid-cols-2 gap-4">
          <div className="xl:w-1/2 sm:w-60 w-60 relative mx-auto">
            <div className=" ">
              <Slider {...settings}>
                {
                  productDetails?.images.map((img , index) => {

                    return <img key={index} src={img} alt={productDetails?.title} className="w-full h-auto object-cover rounded-lg" />
                  })
                }
              </Slider>

              <button isLoading={addToWishlistLoading} onClick={() => addToWishlist(productDetails?._id, setAddToWishlistLoading)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-600 focus:outline-none">
                <svg className="w-6 h-6 absolute top-0 right-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
              </button>
            </div>
          </div>

          <div className=" p-6  ">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">{productDetails?.title}</h1>
            <p className="text-sm text-gray-600 mb-4">{productDetails?.description}</p>
            <div className="flex items-center mb-4">
              <span className="bg-green-500 text-white text-sm font-semibold px-2.5 py-0.5 rounded">{productDetails?.ratingsAverage} ★</span>
              <span className="text-sm text-gray-500 ml-2">Based on {productDetails?.ratingsQuantity} reviews</span>
            </div>

            {/* <ul className="text-sm text-gray-700 mb-6">
        <li className="flex items-center mb-1"><svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>Core i5 Processor (12th Gen)</li>
        <li className="flex items-center mb-1"><svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>8 GB DDR4 RAM</li>
        <li className="flex items-center mb-1"><svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>Windows 11 Home</li>
        <li className="flex items-center"><svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>512 GB SSD</li>
      </ul> */}

            <div className="flex items-center justify-between">
              <div>
                <span className="text-3xl font-bold text-gray-900">${productDetails?.price}</span>
                <span className="ml-2 text-sm font-medium text-gray-500 line-through">${productDetails?.price + 100}</span>
              </div>
              <span className="bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded">Save 10%</span>
            </div>

            <p className="text-green-600 text-sm font-semibold mb-4">Free Delivery</p>

            <div className="flex space-x-4">

              <Button isLoading={addToCartLoading} onPress={() => addToCart(productDetails?._id, setAddToCartLoading)} className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300">
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
      <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center py-6" >Our products</h1>

      <div className="justify-center items-center p-6 mx-auto shadow-lg bg-white rounded-lg mt-6">
        <div   >   <RelatedProducts relatedProduct={relatedProduct} /></div>

      </div>
    </>
  )
}
