import { SessionProvider } from "next-auth/react";
import AuthHeader from "../components/AuthHeader";
import '../app/globals.css';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter();
  const hideHeaderPaths = ['/signup', '/login', '/campaigns'];
  const showHeader = !hideHeaderPaths.includes(router.pathname);

  return (
    <SessionProvider session={session}>
      {showHeader && <AuthHeader />}
      <Component {...pageProps} />
    </SessionProvider>
  );
} 