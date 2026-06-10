import { Link } from "react-router-dom";
import { HomeIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-cyan-50 flex items-center justify-center p-6">
      <div className="max-w-5xl w-full flex flex-col lg:flex-row rounded-3xl overflow-hidden shadow-2xl">

        {/* Left Side */}
        <div className="lg:w-1/2 bg-gradient-to-br from-teal-600 to-blue-700 p-12 flex flex-col justify-center relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500 rounded-full blur-xl opacity-40" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-teal-500 rounded-full blur-xl opacity-40" />

          <div className="relative z-10 text-white">
            <div className="flex items-center space-x-3 mb-10">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                <ExclamationTriangleIcon className="w-7 h-7" />
              </div>

              <h1 className="text-3xl font-bold">
                TouchYatra
              </h1>
            </div>

            <h2 className="text-5xl font-bold mb-4">
              404
            </h2>

            <h3 className="text-2xl font-semibold mb-4">
              Page Not Found
            </h3>

            <p className="text-teal-100 text-lg max-w-md">
              The page you're looking for doesn't exist, has been moved,
              or the link may be incorrect.
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="lg:w-1/2 bg-white p-12 flex items-center justify-center">
          <div className="text-center max-w-md">
            <div className="w-28 h-28 mx-auto mb-8 rounded-full bg-red-50 flex items-center justify-center">
              <ExclamationTriangleIcon className="w-16 h-16 text-red-500" />
            </div>

            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Oops!
            </h2>

            <p className="text-gray-500 mb-8">
              We couldn't find the page you're trying to access.
            </p>

            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 transition-all shadow-lg"
            >
              <HomeIcon className="w-5 h-5" />
              Go To Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}