import { Link, NavLink } from "react-router-dom";
import { Menu, X, Github } from "lucide-react"; // 👈 Added Github icon
import { useState, useEffect, useRef } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const navItems = [
    { name: "Single Checkout", path: "/single-checkout" },
    { name: "Subscription Billing", path: "/plans" },
    { name: "Multi/Single Checkout", path: "/multi-checkout" },
  ];

  // ✅ Close menu on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  return (
    <header className="bg-white shadow-2xl sticky top-0 z-50 backdrop-blur-md bg-opacity-90">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          Stripe Imp.
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6">
          <nav className="flex space-x-6">
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

          {/* GitHub Icon */}
          <a
            href="https://github.com/ABIDULLAH786/stripe-with-react-node" // 👈 your repo link
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-indigo-600 transition-colors"
            title="View on GitHub"
          >
            <Github size={22} />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-gray-700 hover:text-indigo-600 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div
          ref={menuRef}
          className="md:hidden bg-white shadow-md border-t border-gray-200 flex flex-col space-y-2 px-4 py-3"
        >
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `block px-2 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? "text-indigo-600 bg-indigo-50"
                    : "text-gray-700 hover:text-indigo-500 hover:bg-gray-50"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}

          {/* GitHub link for mobile */}
          <a
            href="https://github.com/ABIDULLAH786/stripe-with-react-node"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-2 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-lg"
          >
            <Github size={20} /> GitHub Repo
          </a>
        </div>
      )}
    </header>
  );
}
