import { useCart } from "../../context/CartContext";
import { useState, useEffect } from "react";

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [buyNowProduct, setBuyNowProduct] = useState(null);

  // 🔹 Load Buy Now Product if exists
  useEffect(() => {
    const stored = localStorage.getItem("buyNowProduct");
    if (stored) {
      setBuyNowProduct(JSON.parse(stored));
    }
  }, []);

  // 🔹 Calculate subtotal
  const subtotal = buyNowProduct
    ? buyNowProduct.price
    : cart?.reduce((acc, item) => acc + item.price * item.quantity, 0) || 0;

  const shipping = subtotal > 0 ? 80 : 0;
  const total = subtotal + shipping;

  const handleOrder = () => {
    if (!address || !phone) {
      alert("Please fill delivery information.");
      return;
    }

    // Example: Call backend order API here
    // await axios.post("/api/orders", {...})

    setOrderPlaced(true);

    if (buyNowProduct) {
      localStorage.removeItem("buyNowProduct");
    } else {
      clearCart();
    }
  };

  if (orderPlaced) {
    return (
      <div className="max-w-3xl mx-auto p-6 text-center">
        <h2 className="text-2xl font-bold text-green-600 mb-4">
          Order Placed Successfully!
        </h2>
        <p className="text-gray-600">
          Thank you for your order. We will deliver it to your address soon.
        </p>
      </div>
    );
  }

  // 🔹 Select source: Buy Now or Cart
  const items = buyNowProduct ? [buyNowProduct] : cart;

  return (
    <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-10">
      {/* Left: Delivery Information */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-bold mb-4">Delivery Information</h2>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Address</label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your delivery address"
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
            rows="3"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Phone</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your phone number"
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Payment Method</h3>
          <label className="flex items-center gap-2">
            <input type="radio" defaultChecked />
            Cash on Delivery (COD)
          </label>
        </div>

        <button
          onClick={handleOrder}
          className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
        >
          Complete Order
        </button>
      </div>

      {/* Right: Order Summary */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>

        <div className="divide-y">
          {items?.length > 0 ? (
            items.map((item) => (
              <div key={item.id} className="flex items-center gap-4 py-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-contain rounded-lg border"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800">{item.name}</h3>
                  <p className="text-sm text-gray-500">
                    Qty: {item.quantity || 1}
                  </p>
                </div>
                <span className="font-semibold">৳{item.price}</span>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-6">
              Your cart is empty.
            </p>
          )}
        </div>

        {/* Subtotal & Total */}
        <div className="mt-6 space-y-2 text-gray-700">
          <div className="flex justify-between">
            <span>Subtotal ({items.length} item{items.length > 1 ? "s" : ""})</span>
            <span>৳{subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>৳{shipping}</span>
          </div>
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>৳{total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
