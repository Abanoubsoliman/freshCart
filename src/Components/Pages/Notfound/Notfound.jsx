
import { Link } from "react-router-dom";

export default function Notfound() {
  return (
    <div className="bg-gradient-to-br from-green-50 to-white w-full h-full">
      <div className="container max-w-4xl mx-auto px-4 w-full flex items-center justify-center">
        <div className="text-center">
         
          <div className="animate-float mb-8 mx-auto">
            <svg
              className="w-32 h-32 text-emerald-600 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M9 17l-1-4m6 4l1-4m-6 0h4"
                className="text-red-500"
              />
            </svg>
          </div>

        
          <h1 className="text-9xl font-bold text-emerald-600 mb-4">404</h1>
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Page not found!
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
          It appears that the page you are looking for has been moved or removed.
            <br />
            You can return to the home page or search for what you need.
          </p>

       
          <Link
            to="/"
            className="inline-block bg-emerald-600 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-emerald-700 transition-all duration-300 transform hover:-translate-y-1"
          >
            Back to Home Page
          </Link>

         
          <p className="mt-8 text-gray-500">
          Need help?{" "}
            <a
              href="mailto:support@freshcart.com"
              className="text-emerald-600 hover:underline"
            >
              Contact Support Team
            </a>
          </p>
        </div>
      </div>

      <style>{`
      @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-20px); }
      }
      .animate-float {
        animation: float 3s ease-in-out infinite;
      }
    `}</style>
    </div>
  );
}
