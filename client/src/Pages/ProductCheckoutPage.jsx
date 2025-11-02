import React, { useState } from "react";
import Button from "../Components/Button";
import axios from "axios";
import products from "../assets/products";
const ProductCheckoutPage = () => {


  const [quantities, setQuantities] = useState(
    products.reduce((acc, p) => ({ ...acc, [p.id]: 0 }), {})
  );

  const handleIncrease = (id) =>
    setQuantities((prev) => ({ ...prev, [id]: prev[id] + 1 }));

  const handleDecrease = (id) =>
    setQuantities((prev) => ({ ...prev, [id]: Math.max(0, prev[id] - 1) }));

  const handleCheckout = async () => {
    const selected = products
      .filter((p) => quantities[p.id] > 0)
      .map((p) => ({
        id: p.id,
        title: p.title,
        quantity: quantities[p.id],
        price: p.price,
        image: p.image,
      }));

    if (selected.length === 0) {
      alert("Please select at least one product before checkout.");
      return;
    }

    try {
      localStorage.setItem("lastPath", location.pathname);
      const { data } = await axios.post(
        `${import.meta.env.VITE_BE_SERVER_URL}/api/stripe/create-multi-checkout-session`,
        { products: selected }
      );
      window.location.href = data.url;
    } catch (err) {
      console.error(err);
      alert("Checkout failed. Please try again!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-10">Shop Products</h1>

      {/* Grid container: mobile -> grid, desktop -> list */}
      <div className="max-w-5xl mx-auto grid gap-5 grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-col">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex flex-col lg:flex-row items-center justify-between bg-white shadow-sm rounded-2xl p-4 border border-gray-200 hover:shadow-md transition"
          >
            {/* Image + Info */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 w-full">
              <img
                src={product.image}
                alt={product.title}
                className="w-full sm:w-32 h-40 object-cover rounded-xl"
              />
              <div className="text-center sm:text-left">
                <h2 className="text-lg font-semibold">{product.title}</h2>
                <p className="text-gray-600 text-sm">{product.description}</p>
                <p className="mt-1 font-bold text-gray-900">${product.price}</p>
              </div>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center justify-center gap-3 mt-4 lg:mt-0">
              <button
                onClick={() => handleDecrease(product.id)}
                className="bg-gray-200 cursor-pointer text-gray-700 rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold hover:bg-gray-300"
              >
                -
              </button>
              <input
                type="number"
                min="0"
                readOnly
                value={quantities[product.id]}
                className="w-12 text-center border rounded-md"
              />
              <button
                onClick={() => handleIncrease(product.id)}
                className="bg-blue-600 cursor-pointer text-white rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold hover:bg-blue-700"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto mt-10 text-center">
        <Button onClick={handleCheckout} variant="primary">
          Pay Now
        </Button>
      </div>
    </div>
  );
};

export default ProductCheckoutPage;
