import { motion } from "framer-motion";
import Button from "../Components/Button";
import products from "../assets/products";
import axios from "axios";


const LandingPage = () => {
  const handleCheckout = async (product) => {
    // Save the current route before redirecting
    localStorage.setItem("lastPath", location.pathname);

    const { data } = await axios.post(`${import.meta.env.VITE_BE_SERVER_URL}/api/stripe/create-checkout-session`, { product });
    console.log({ data })
    window.location.href = data.url; // Redirect to Stripe Checkout
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-gray-900 to-black text-white flex flex-col items-center">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center mt-20 px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-pink-400"
        >
          Shop Smart. Shop Stylish.
        </motion.h1>
        <p className="text-gray-300 mt-4 max-w-lg">
          Discover exclusive tech products that redefine your everyday lifestyle.
        </p>
        <div className="mt-8">
          <Button onClick={() => (window.location.href = "/multi-checkout")}>
            Explore Products
          </Button>
        </div>
      </section>

      {/* Product Showcase */}
      <section className="mt-24 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 px-6 md:px-16 pb-20 w-full max-w-6xl">
        {products?.slice(0, 3).map((p) => (
          <motion.div
            key={p.id}
            whileHover={{ scale: 1.03 }}
            className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-5 shadow-lg hover:shadow-indigo-500/30 transition"
          >
            <img
              src={p.image}
              alt={p.title}
              className="rounded-xl w-full h-56 object-cover"
            />
            <h3 className="text-2xl font-semibold mt-4">{p.title}</h3>
            <p className="text-gray-400 mt-2 line-clamp-2">{p.desc}</p>
            <div className="flex items-center justify-between mt-4">
              <span className="text-lg font-bold text-indigo-300">${p.price}</span>
              <Button
                onClick={() => handleCheckout(p)}
                className="px-4 py-2 text-sm"
              >
                Buy Now
              </Button>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Footer */}
      <footer className="text-gray-500 pb-8 text-sm">
        © {new Date().getFullYear()} Stipe Imp. — Built with ❤️ by Abid Ullah
      </footer>
    </div>
  );
};

export default LandingPage;
