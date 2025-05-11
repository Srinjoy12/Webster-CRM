import Link from 'next/link';
// import { useLocation } from "react-router-dom"; // Likely unused in a Next.js context, consider removing if not needed
import { useEffect } from "react";

const NotFound = () => {
  // const location = useLocation(); // If using Next.js router, this would be replaced

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      typeof window !== 'undefined' ? window.location.pathname : '' // Get pathname in a Next.js friendly way for client-side
    );
  }, []); // Empty dependency array if console.error should run once on mount

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
        <Link href="/" legacyBehavior>
          <a className="text-blue-500 hover:text-blue-700 underline">
            Return to Home
          </a>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
