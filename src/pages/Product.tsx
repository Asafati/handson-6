import { useQuery } from "@tanstack/react-query";
import axios from "../utils/AxiosIstate";
import { useNavigate } from "react-router-dom";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
}

interface ProductData {
  Products: Product[];
}

const fetchProductList = async () => {
  return await axios.get<ProductData>("/products");
};

const ProductSkeleton = () => {
  return (
    <div className="group reletive">
      {/*Image Placeholder */}
      <div className="aspect-square w-full rounded-md bg-gray-200 animate-pulse lg:aspect-auto lg:h-80"></div>

      <div className="mt-4 flex justify-between">
        {/*Title Placeholder */}
        <div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
          {/*Description Placeholder */}
          <div className="mt-1 h-3 bg-gray-200 rounded  animate-pulse w-2/3"></div>
        </div>
        {/*Price Placeholder */}
        <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4 "></div>
      </div>
    </div>
  );
};

const Product = () => {
  const getProductList = useQuery({
    queryKey: ["productList"],
    queryFn: fetchProductList,
  });
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4">
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:py-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            List of Products
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8">
            {getProductList.isRefetching
              ? Array.from({ length: 4 }).map((_, index) => (
                  <ProductSkeleton key={index} />
                ))
              : getProductList.data?.data.Products.map((product) => (
                  <div
                    key={product.id}
                    className="group relative"
                    onClick={() => navigate(`/products/${product.id}`)}
                  >
                    <img
                      alt={product.title}
                      src={product.thumbnail}
                      className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                    />
                    <div className="mt-4 flex justify-between">
                      <div>
                        <h3 className="text-sm text-gray-700">
                          <a>
                            <span
                              aria-hidden="true"
                              className="absolute inset-0"
                            />
                            {product.title}
                          </a>
                        </h3>
                        <p className="text-sm text-gray-700">
                          {product.description}
                        </p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        {product.price}$
                      </p>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
