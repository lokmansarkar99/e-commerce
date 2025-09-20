import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getProductById } from "../../api/productApi";

export default function ProductDetails() {
  const { productId } = useParams(); 
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getProductById(productId);
        setProduct(res);
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) return <p className="text-center py-6 text-gray-500">Loading...</p>;
  if (!product) return <p className="text-center py-6 text-red-500">Product not found!</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-10">
      {/* Left: Image Section */}
      <div className="flex items-center justify-center bg-gray-50 rounded-xl shadow-md p-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-[450px] object-contain rounded-lg"
        />
      </div>

      {/* Right: Details Section */}
      <div className="flex flex-col justify-between">
        {/* Title & Description */}
        <div>
          <h1 className="text-4xl font-extrabold mb-3 text-gray-900">{product.name}</h1>
          <p className="text-gray-600 mb-5 leading-relaxed">{product.description}</p>

          {/* Price */}
          <div className="mb-5">
            <span className="text-3xl font-bold text-blue-600">
              ${product.price.toFixed(2)}
            </span>
          </div>

          {/* Stock */}
          <p className="mb-6">
            <span className="font-medium text-gray-700">Availability: </span>
            <span
              className={`${
                product.stock > 0 ? "text-green-600 font-semibold" : "text-red-600 font-semibold"
              }`}
            >
              {product.stock > 0 ? `${product.stock} in stock` : "Out of Stock"}
            </span>
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <button
            disabled={product.stock <= 0}
            className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold shadow hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Add to Cart
          </button>

          <button
            disabled={product.stock <= 0}
            className="flex-1 bg-green-600 text-white px-6 py-3 rounded-xl font-semibold shadow hover:bg-green-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
