'use client'; // Assuming it might have client-side interactions

import App from '../../components/landing/App';
import '../../components/landing/index.css'; // Import the CSS
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="bg-white">
      <div className="w-full max-w-6xl mx-auto px-4 md:px-6 lg:px-8 bg-white">
        {/* We can add a header or navigation specific to the main app here if needed */}
        <App />
        {/* Example of adding a link to the sign-up page */}
        {/* You'll need to tell me the actual path to your sign-up page */}
        {/* 
        <div style={{ textAlign: 'center', marginTop: '2rem', paddingBottom: '2rem' }}>
          <Link href="/signup">
            <button style={{ padding: '10px 20px', fontSize: '1.2rem', cursor: 'pointer' }}>
              Go to Sign Up
            </button>
          </Link>
        </div>
        */}
      </div>
    </div>
  );
}
