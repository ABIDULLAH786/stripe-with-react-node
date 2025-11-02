import React, { useState } from "react";
import Button from "../Components/Button";

const ProductCheckoutPage = () => {
    const products = [
        {
            id: "prod_1",
            title: "Wireless Headphones",
            description: "Noise-cancelling Bluetooth headphones with 20h battery life.",
            price: 89,
            image: "https://raw.githubusercontent.com/ABIDULLAH786/data-source/refs/heads/main/product-images/headset-black.jpg",
        },
        {
            id: "prod_2",
            title: "Mobile",
            description: "Track fitness, heart rate, and notifications on the go.",
            price: 120,
            image: "https://raw.githubusercontent.com/ABIDULLAH786/data-source/refs/heads/main/product-images/mobile-black-bg.webp",
        },
        {
            id: "prod_3",
            title: "Mechanical Keyboard",
            description: "RGB backlit mechanical keyboard for typing enthusiasts.",
            price: 70,
            image: "https://raw.githubusercontent.com/ABIDULLAH786/data-source/refs/heads/main/product-images/laptop-mac-mechanical-keyboard.jpeg",
        },
        {
            id: "prod_4",
            title: "Gaming Mouse",
            description: "High precision mouse with adjustable DPI and side buttons.",
            price: 45,
            image: "https://raw.githubusercontent.com/ABIDULLAH786/data-source/refs/heads/main/product-images/mouse-rgb-white.jpg",
        },
    ];

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
                image: p.image
            }));

        if (selected.length === 0) {
            alert("Please select at least one product before checkout.");
            return;
        }

        try {
            const res = await fetch("http://localhost:5000/api/stripe/create-multi-checkout-session", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ products: selected }),
            });
            const data = await res.json();
            window.location.href = data.url;
        } catch (err) {
            console.error(err);
            alert("Checkout failed. Please try again!");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <h1 className="text-3xl font-bold text-center mb-10">Shop Products</h1>

            <div className="max-w-4xl mx-auto flex flex-col gap-5">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="flex items-center justify-between bg-white shadow-sm rounded-2xl p-4 border border-gray-200"
                    >
                        {/* Left section: image + text */}
                        <div className="flex items-center gap-4">
                            <img
                                src={product.image}
                                alt={product.title}
                                className="w-28 h-24 object-cover rounded-lg"
                            />
                            <div>
                                <h2 className="text-lg font-semibold">{product.title}</h2>
                                <p className="text-gray-600 text-sm">{product.description}</p>
                                <p className="mt-1 font-bold text-gray-900">${product.price}</p>
                            </div>
                        </div>

                        {/* Right section: quantity controls */}
                        <div className="flex items-center gap-3">
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
                <Button
                    onClick={handleCheckout}
                    variant="primary"
                >
                    Pay Now
                </Button>
            </div>
        </div>
    );
};

export default ProductCheckoutPage;
