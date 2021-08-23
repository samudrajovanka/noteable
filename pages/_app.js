import Layout from '@components/layout';
import Head from 'next/head';
import '../styles/globals.css';
import 'tailwindcss/tailwind.css';
import { NotificationContextProvider } from '@context/notification-context';
import { Provider as AuthProvider } from 'next-auth/client';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider session={pageProps.session}>
      <NotificationContextProvider>
        <Layout>
          <Head>
            <title>Noteable</title>
          </Head>

          <Component {...pageProps} />
        </Layout>
      </NotificationContextProvider>
    </AuthProvider>
  );
}

export default MyApp;
