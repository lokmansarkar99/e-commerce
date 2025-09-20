import { useCart } from "../../context/CartContext";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice } = useCart();

  if (cart.length === 0) {
    return <p className="text-center py-10 text-gray-600"> Your cart is empty.</p>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

      <div className="grid gap-6">
        {cart.map((item) => (
          <div key={item.id} className="flex items-center justify-between border-b pb-4">
            {/* Image */}
            <div className="flex items-center gap-4">
              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
              <div>
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-gray-600">{item.price} ৳</p>
              </div>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="px-2 py-1 border rounded"
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="px-2 py-1 border rounded"
              >
                +
              </button>
            </div>

            {/* Subtotal */}
            <p className="font-semibold">{(item.price * item.quantity).toFixed(2)} ৳</p>

            {/* Remove */}
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-500 hover:underline"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Cart Summary */}
      <div className="mt-8 p-6 border rounded-lg shadow bg-gray-50">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <p className="mb-2">Total Items: <span className="font-medium">{totalItems}</span></p>
        <p className="mb-4">Total Price: <span className="font-bold text-green-600">{totalPrice.toFixed(2)} ৳</span></p>

        <div className="flex gap-4">
          <button
            onClick={clearCart}
            className="flex-1 bg-gray-200 py-3 rounded-lg hover:bg-gray-300"
          >
            Clear Cart
          </button>
          <button
            className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
