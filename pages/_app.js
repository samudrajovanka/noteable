import Layout from '@components/layout';
import Head from 'next/head';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>Noteable</title>
      </Head>

      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
