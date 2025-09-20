import { useEffect, useState } from "react";
import { getProducts } from "../../api/productApi";
import { useSearch } from "../../context/SearchContext";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("ALL");
  const [sort, setSort] = useState("none");
  const [message, setMessage] = useState(""); //  success message
  const { search } = useSearch();
  const { addToCart } = useCart(); //  use cart

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProducts();
        setProducts(data.products);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  // Filtering, Sorting, Searching
  const filteredProducts = products
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    .filter((p) => (category === "ALL" ? true : p.category?.name === category))
    .sort((a, b) => {
      if (sort === "low-high") return a.price - b.price;
      if (sort === "high-low") return b.price - a.price;
      return 0;
    });

  //  Handle Add to Cart
  const handleAddToCart = (product) => {
    addToCart(product);
    setMessage(` ${product.name} added to cart!`);
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-6 text-center text-black">
         Our Products
      </h1>

      {/*  Success Message */}
      {message && (
        <div className="mb-6 p-3 text-center bg-green-100 text-green-700 border border-green-300 rounded-lg shadow">
          {message}
        </div>
      )}

      {/* Filter + Sort bar */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-gray-100 p-4 rounded-lg shadow-sm mb-8 gap-4">
        <div className="flex gap-4">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border px-3 py-2 rounded-lg focus:outline-none focus:ring-1"
          >
            <option value="ALL">All Categories</option>
            <option value="Fashion">Fashion</option>
            <option value="Gadgets">Gadgets</option>
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border px-3 py-2 rounded-lg focus:outline-none focus:ring-1"
          >
            <option value="none">Default</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
          </select>
        </div>

        <p className="text-gray-600 font-medium">
          {filteredProducts.length} items found
        </p>
      </div>

      {/* Product List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((p) => (
            <div
              key={p.id}
              className="relative border rounded-xl shadow-md hover:shadow-xl transition bg-white p-4 flex flex-col"
            >
              <Link to={`/product/${p.id}`}>
                <img
                  src={p.image}
                  alt={p.name}
                  className="h-44 w-full object-cover mb-3 rounded-md"
                />
              </Link>

              <Link to={`/product/${p.id}`}>
                <h2 className="text-lg font-semibold line-clamp-2 text-gray-800">
                  {p.name}
                </h2>
              </Link>

              {/* Price */}
              <div className="mt-2">
                <span className="text-red-600 font-bold text-lg">
                  {p.price} ৳
                </span>
              </div>

              <p className="text-sm text-gray-500 mt-1">
                {p.category?.name || "Unknown"}
              </p>

              {/* Buttons */}
              <div className="flex gap-2 mt-auto pt-4">
                <button className="flex-1 bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition">
                  Buy Now
                </button>
                <button
                  onClick={() => handleAddToCart(p)}
                  className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full flex justify-center">
            <p className="text-gray-500 text-lg font-medium">
              No products found.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
