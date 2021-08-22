import Layout from '@components/layout';
import Head from 'next/head';
import '../styles/globals.css';
import 'tailwindcss/tailwind.css';
import { NotificationContextProvider } from '@context/notification-context';

function MyApp({ Component, pageProps }) {
  return (
    <NotificationContextProvider>
      <Layout>
        <Head>
          <title>Noteable</title>
        </Head>

        <Component {...pageProps} />
      </Layout>
    </NotificationContextProvider>
  );
}

export default MyApp;
