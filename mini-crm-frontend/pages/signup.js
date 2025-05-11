import { useState } from 'react';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import { Sparkles, Camera } from 'lucide-react';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    // TODO: Implement backend signup API
    try {
      // Placeholder: simulate signup success
      setTimeout(() => {
        setLoading(false);
        router.push('/campaigns');
      }, 1000);
    } catch (err) {
      setError('Signup failed.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row font-inter">
      {/* Left Column */}
      <div className="md:w-1/2 bg-gradient-to-br from-white via-sky-100 to-sky-200 text-slate-800 p-8 md:p-12 flex flex-col justify-between relative">
        <div className="absolute top-8 left-8">
          <Sparkles size={48} className="text-sky-500" />
        </div>
        <div className="my-auto">
          <h1 className="text-4xl lg:text-5xl font-regular font-grotesk mb-4">
            Join Webster Today! 
            <span role="img" aria-label="wave">👋</span>
          </h1>
          <p className="text-lg lg:text-xl text-slate-600 leading-relaxed">
            Unlock powerful CRM tools, streamline your sales, and gain real-time insights to grow your business.
          </p>
        </div>
        <div className="flex items-center justify-between text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} Webster. All rights reserved.</p>
          <Camera size={20} className="text-sky-600" />
        </div>
      </div>

      {/* Right Column */}
      <div className="md:w-1/2 bg-white flex flex-col items-center justify-center p-8 md:p-12">
        <div className="max-w-md w-full">
          <div className="mb-8 text-left">
             <a href="/" className="font-grotesk text-3xl font-regular text-gray-800">Webster</a>
          </div>
          <h2 className="text-2xl font-regular text-gray-900 mb-3 font-grotesk">
            Create your account
          </h2>
          <p className="text-sm text-gray-600 mb-8">
            Already have an account?{' '}
            <a href="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Log in
            </a>
          </p>

          <form onSubmit={handleSignup} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
            type="email"
                autoComplete="email"
                required
            value={email}
            onChange={e => setEmail(e.target.value)}
                className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Email address"
          />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
            type="password"
                autoComplete="current-password"
                required
            value={password}
            onChange={e => setPassword(e.target.value)}
                className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Password"
              />
            </div>

            {error && <p className="text-xs text-red-600 text-center">{error}</p>}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 disabled:opacity-60 transition duration-150 ease-in-out"
              >
                {loading ? 'Creating account...' : 'Create Account'}
              </button>
            </div>
        </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">OR</span>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={() => signIn('google', { callbackUrl: '/campaigns' })}
                className="w-full inline-flex justify-center items-center py-3 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 mr-2 -ml-1">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.82-2.22.84-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  <path d="M1 1h22v22H1z" fill="none"/>
                </svg>
                Sign up with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 