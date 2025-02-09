import { Button } from "@heroui/react";
import { Link } from "react-router-dom";
import { addToCart } from "../../Services/CartServices";
import { useState } from "react";
import { addToWishlist } from "../../Services/AddWishlist";
import { motion, AnimatePresence } from "framer-motion";

export default function Product({ product }) {
  const [isLoading, setIsLoading] = useState(false);
  const [cartIsLoading, setCartIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const discountPercentage = Math.round((50 / (product.price + 50)) * 100);

  const starVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative flex flex-col justify-between w-full max-w-sm bg-white border-2 rounded-2xl border-gray-100 hover:border-gray-200 transition-all p-4 cursor-pointer group overflow-hidden shadow-lg hover:shadow-xl"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Badge Container */}
      <div className="absolute top-4 left-4 z-10 flex gap-2">
        <motion.span 
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="px-3 py-1 text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg backdrop-blur-sm"
        >
          -{discountPercentage}%
        </motion.span>
        {product.quantity === 0 && (
          <span className="px-3 py-1 text-xs font-bold text-white bg-red-600 rounded-full shadow-lg backdrop-blur-sm">
            ⚡ Sold Out
          </span>
        )}
      </div>

      <Link 
        to={/product / + product._id} 
        className="relative block overflow-hidden rounded-xl"
      >
        {/* Image Section */}
        <motion.div 
          className="relative overflow-hidden rounded-xl aspect-square"
          whileHover={{ scale: 1.05 }}
        >
          <img
            src={product.imageCover}
            alt={product.name}
            className="object-cover w-full h-full transition-all duration-500"
          />
          
          {/* Quick View Overlay */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm"
              >
                <motion.span
                  initial={{ y: 20 }}
                  animate={{ y: 0 }}
                  className="text-sm font-semibold text-white tracking-wider"
                >
                  Quick View
                </motion.span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Product Details */}
        <div className="px-2 mt-4 space-y-3">
          {/* Category Tag */}
          <motion.div 
            className="text-xs font-medium text-purple-600 uppercase tracking-wide"
            whileHover={{ x: 5 }}
          >
            {product.category?.name}
          </motion.div>

          {/* Title & Description */}
          <h3 className="text-lg font-bold text-gray-900 line-clamp-1 leading-tight">
            {product.title}
          </h3>
          <p className="text-sm text-gray-500 line-clamp-2 h-[3.25rem] leading-relaxed">
            {product.description}
          </p>

          {/* Price & Rating */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <p className="text-2xl font-bold text-gray-900">
                  ${product.price}
                </p>
                <p className="text-sm text-gray-400 line-through">
                  ${product.price + 50}
                </p>
              </div>
              <div className="flex items-center mt-1 gap-1.5">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <motion.svg 
                      key={i}
                      variants={starVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: i * 0.1 }}
                      className="w-4 h-4 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </motion.svg>
                  ))}
                </div>
                <span className="text-sm font-medium text-gray-500">
                  ({product.ratingsAverage})
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>

      {/* Action Buttons */}
      <motion.div 
        className="mt-4 space-y-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Button
          isLoading={cartIsLoading}
          onPress={() => addToWishlist(product._id, setCartIsLoading)}
          className="w-full transition-all hover:shadow-md active:scale-95"
          color="primary"
          variant="shadow"
          startContent={
            <svg 
              className="w-5 h-5" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          }
          spinner={
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1 }}
            />
          }
        >
          Add to Wishlist
        </Button>

        <Button
          isLoading={isLoading}
          onPress={() => addToCart(product._id, setIsLoading)}
          className="w-full transition-all hover:shadow-md active:scale-95"
          color="success"
          variant="shadow"
          startContent={
            <svg 
              className="w-5 h-5" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
          }
          isDisabled={product.quantity === 0}
          spinner={
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1 }}
            />
          }
        >
          {product.quantity === 0 ? "Out of Stock" : "Add to Cart"}
        </Button>
      </motion.div>
    </motion.div>
  );
}