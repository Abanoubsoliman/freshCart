
import axios from "axios";
import { useEffect, useState } from "react";
import Product from "../../Product/Proudct";
import LoadingScreen from "../../LoadingScreen/LoadingScreen";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    getAllProducts();
  }, []);

  async function getAllProducts() {
    setIsLoading(true)
    const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/products");
    setProducts(data.data);
    setIsLoading(false)
  }
  if (isLoading) {

    return (<LoadingScreen />)
  }
  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 m-auto max-w-7xl p-6 items-center justify-center ] ">
      {products.map((product, index) => {
        return (<div key={index} className=" ">

          <Product product={product}  />

        </div>
        )

      })}
    </div>

  );
}
