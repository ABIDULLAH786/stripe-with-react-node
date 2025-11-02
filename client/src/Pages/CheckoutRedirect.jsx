import axios from "axios";
import { useState } from "react";

export default function CheckoutRedirect() {
    const [product] = useState({
        name: "React Stripe Checkout",
        price: 99.99,
        productBy: "Facebook",
    });
    console.log("VITE_BE_SERVER_URL", import.meta.env.VITE_BE_SERVER_URL);
    const handleCheckout = async () => {
        // Save the current route before redirecting
        localStorage.setItem("lastPath", location.pathname);

        const { data } = await axios.post(`${import.meta.env.VITE_BE_SERVER_URL}/api/stripe/create-checkout-session`);
        console.log({ data })
        window.location.href = data.url; // Redirect to Stripe Checkout
    };
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gray-50">
            <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center">
                <h2 className="text-2xl font-semibold text-indigo-600 mb-2">
                    Checkout With Redirect
                </h2>
                <p className="text-gray-600 mb-6">
                    Pay securely using Stripe for <span className="font-medium">{product.name}</span>
                </p>

                {/* Product card */}
                <div className="border rounded-lg p-4 mb-6">
                    <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                    <p className="text-gray-500 text-sm">by {product.productBy}</p>
                    <p className="text-indigo-600 text-xl font-bold mt-2">
                        ${product.price.toFixed(2)}
                    </p>
                </div>

                {/* Stripe Checkout Button */}
                <button
                    onClick={handleCheckout}
                    className="bg-indigo-600 cursor-pointer hover:bg-indigo-700 text-white px-6 py-2 rounded-lg"
                >
                    Pay with Stripe
                </button>
            </div>
        </div>
    )

}
