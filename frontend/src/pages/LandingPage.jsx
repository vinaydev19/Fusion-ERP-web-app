import React from "react";
import { Outlet, Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="font-sans">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">MyBrand</h1>
          <ul className="flex space-x-6">
            <li>
              <a href="#features" className="hover:underline">
                Features
              </a>
            </li>
            <li>
              <a href="#about" className="hover:underline">
                About
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
          <div className="flex space-x-4">
            <Link to="login">
              {" "}
              {/* ✅ Relative Path */}
              <button className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-gray-200">
                Login
              </button>
            </Link>
            <Link to="register">
              {" "}
              {/* ✅ Relative Path */}
              <button className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600">
                Register
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-gray-100 text-center py-20">
        <h1 className="text-4xl font-bold">Welcome to MyBrand</h1>
        <p className="text-lg text-gray-600 mt-2">Your success starts here</p>
        <a
          href="#features"
          className="mt-4 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700"
        >
          Get Started
        </a>
      </header>

      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <h2 className="text-3xl font-bold text-center">Why Choose Us?</h2>
        <div className="mt-8 flex flex-wrap justify-center gap-6">
          <div className="bg-white p-6 shadow-md rounded-lg w-72 text-center">
            <h3 className="text-2xl">🚀 Fast</h3>
            <p className="text-gray-600">
              Super-fast performance with the latest tech.
            </p>
          </div>
          <div className="bg-white p-6 shadow-md rounded-lg w-72 text-center">
            <h3 className="text-2xl">🔒 Secure</h3>
            <p className="text-gray-600">
              Top-notch security to keep your data safe.
            </p>
          </div>
          <div className="bg-white p-6 shadow-md rounded-lg w-72 text-center">
            <h3 className="text-2xl">🎨 Beautiful</h3>
            <p className="text-gray-600">
              Modern, clean, and eye-catching designs.
            </p>
          </div>
        </div>
      </section>

      {/* Outlet to render child routes (Login, Register, etc.) */}
      <div className="container mx-auto p-6">
        <Outlet />
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center p-4 mt-10">
        <p>© 2025 MyBrand. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default LandingPage;
