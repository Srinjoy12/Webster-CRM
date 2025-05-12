'use client'; // Assuming it might have client-side interactions

import App from '../components/landing/App';
import '../components/landing/index.css'; // Import the CSS

export default function Home() { // Renamed from LandingPage to Home for the root page
  return (
    <div className="bg-white">
      <div className="w-full max-w-6xl mx-auto px-4 md:px-6 lg:px-8 bg-white">
        <App />
      </div>
    </div>
  );
}
