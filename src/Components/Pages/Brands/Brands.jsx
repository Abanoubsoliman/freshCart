import { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingScreen from '../../LoadingScreen/LoadingScreen';

export default function Brands() {


  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBrands = async () => {
    try {
      const { data } = await axios.get(
        'https://ecommerce.routemisr.com/api/v1/brands'
      );
      setBrands(data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching wishlist');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return (
      <div className="text-red-500 text-center mt-8 text-xl">
        ⚠️ {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 ">
        Brands
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {brands.map((brand , index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative h-48 bg-gray-100">
              <img
                src={brand.image}
                alt={brand.name}
                className="w-full h-full object-contain p-4"
                loading="lazy"
              />
            </div>
            <div className="p-4 border-t border-gray-100">
              <h3 className="text-lg font-semibold text-center text-gray-700">
                {brand.name}
              </h3>
              <p className="text-sm text-gray-500 text-center mt-2">
                {brand.slug}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
