import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  FaHeartBroken,
  FaShoppingCart,
  FaTrash,
  FaRegSadTear,
} from "react-icons/fa";
import LoadingScreen from "../../LoadingScreen/LoadingScreen";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [processingIds, setProcessingIds] = useState(new Set());

  const  fetchWishlist = async () => {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { headers: { token: localStorage.getItem("token") } }
      );
  
      setWishlist(data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching wishlist");
    } finally {
      setLoading(false);
    }
  };


  const handleRemoveItem = async (productId) => {
    try {
      setProcessingIds(prev => new Set([...prev, productId]));
      
    
      await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        { headers: { token: localStorage.getItem('token') } }
      );
  
      
      setWishlist(prev => 
        prev.filter(item => 
          item.product?._id !== productId && item._id !== productId
        )
      );
  
      toast.success(<div className="flex items-center gap-2"><FaHeartBroken /> Removed from wishlist</div>);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error removing from wishlist");
    } finally {
      setProcessingIds(prev => {
        const next = new Set(prev);
        next.delete(productId);
        return next;
      });
    }
  };
  

  const handleAddToCart = async (productId) => {
    try {
      setProcessingIds((prev) => new Set(prev).add(productId));
      await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId },
        { headers: { token: localStorage.getItem("token") } }
      );
      toast.success(
        <div className="flex items-center gap-2">
          <FaShoppingCart /> Added to cart!
        </div>
      );
    } catch (err) {
      toast.error(err.response?.data?.message || "Error adding to cart");
    } finally {
      setProcessingIds((prev) => {
        const next = new Set(prev);
        next.delete(productId);
        return next;
      });
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  if (loading) return <LoadingScreen />;

  if (error)
    return (
      <div className="text-center py-12 animate-fade-in">
        <div className="text-red-500 text-xl flex flex-col items-center gap-4">
          <FaRegSadTear className="text-4xl" />
          {error}
          <button
            onClick={fetchWishlist}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );

  return (
    <div className="container mx-auto p-4 animate-fade-in">
      <h1 className="text-3xl font-bold mb-8 text-center text-purple-600">
        My Wishlist 💖
      </h1>

      {wishlist.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 text-xl flex flex-col items-center gap-4">
            <FaHeartBroken className="text-6xl animate-pulse" />
            <p>Your wishlist feels lonely...</p>
            <Link
              to="/"
              className="mt-4 px-6 py-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-transform hover:scale-105"
            >
              Explore Products
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((item) => {
             const productId = item.product?._id || item._id;
             const imageUrl = item.product?.imageCover || item.imageCover;
             return (

            <div
              key={productId}
              className="border rounded-xl p-4 bg-white shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <Link to={/product/ + item._id}>
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src={imageUrl}
                    alt={item.title}
                    className="w-full h-48 object-cover transform transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
              </Link>

              <div className="mt-4">
                <h3 className="text-lg font-bold text-gray-800 truncate">
                  {item.title}
                </h3>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-xl font-semibold text-purple-600">
                    EGP {item.price}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAddToCart(productId)}
                      disabled={processingIds.has(productId)}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
                    >
                      {processingIds.has(productId) ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <FaShoppingCart />
                      )}
                      Cart
                    </button>
                    <button
                      onClick={() => handleRemoveItem(productId)}
                      disabled={processingIds.has(productId)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
                    >
                      {processingIds.has(productId) ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <FaTrash />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
          })}
        </div>
      )}
    </div>

    

  );
};
export default Wishlist;
