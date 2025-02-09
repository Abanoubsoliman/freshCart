import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import LoadingScreen from '../../LoadingScreen/LoadingScreen';

export default function Categories() {
  const {
    data: categories = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data } = await axios.get(
        'https://ecommerce.routemisr.com/api/v1/categories'
      );
      return data.data;
      
    },
    staleTime: 5 * 60 * 1000, 
    retry: 2,
    refetchOnWindowFocus: false,
    cacheTime: 5 * 60 * 1000,
    
  });

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isError) {
    const errorMessage =
      axios.isAxiosError(error) && error.response?.data?.message
        ? error.response.data.message
        : 'Failed to fetch categories';

    return (
      <div className="text-red-500 text-center mt-8 text-xl">
        ⚠️ {errorMessage}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Categories
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <div
            key={category._id} 
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative h-48 bg-gray-100">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-contain p-4"
                loading="lazy"
                onError={(e) => {
                  e.target.src = '/default-image.png';
                }}
              />
            </div>
            <div className="p-4 border-t border-gray-100">
              <h3 className="text-lg font-semibold text-center text-gray-700">
                {category.name}
              </h3>
              <p className="text-sm text-gray-500 text-center mt-2">
                {category.slug}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}