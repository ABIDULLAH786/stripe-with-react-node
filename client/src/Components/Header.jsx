import { Link, NavLink } from "react-router-dom";

export default function Header() {
  const navItems = [
    { name: "Checkout Redirect", path: "/checkout-redirect" },
    { name: "Subscription Billing", path: "/plans" },
    { name: "Stripe Elements", path: "/elements" },
    { name: "Payment Intent API", path: "/payment-intent" },
  ];

  return (
    <header className="bg-white  shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Title */}
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          Stripe Imp.
        </Link>

        {/* Navigation */}
        <nav className="space-x-4">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive
                    ? "text-indigo-600 border-b-2 border-indigo-600 pb-1"
                    : "text-gray-700 hover:text-indigo-500"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
