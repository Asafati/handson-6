import axios from "../utils/AxiosIstate";  
interface ProductDetail {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: {
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    barcode: string;
    qrCode: string;
  };
  images: string[];
  thumbnail: string;
}

interface Review {
  rating: number;
  comment: string;
  date: string; // ISO date string
  reviewerName: string;
  reviewerEmail: string;
}

interface DeletedProduct extends ProductDetail {
  isDeleted: Boolean;
  deletedOn: string;
}

const fetchProductDetail = async (id: string | undefined) => {
  return await axios.get<ProductDetail>(`/product/${id}`);
};

const ProductDetail = () => {
  const { id } = useParams();
  const getProductDetail = useQuery({   
    queryKey: ["productDetail", id],
    queryFn: () => fetchProductDetail (id),
  });   
  return<div>

    </div> ;
};

export default ProductDetail