import Layout from '@components/layout';
import Head from 'next/head';
import '../styles/globals.css';
import 'tailwindcss/tailwind.css';
import { NotificationContextProvider } from '@context/notificationContext';
import { NotesContextProvider } from '@context/notesContext';
import { Provider as AuthProvider } from 'next-auth/client';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider session={pageProps.session}>
      <NotificationContextProvider>
        <NotesContextProvider>
          <Layout>
            <Head>
              <title>Noteable</title>
            </Head>

            <Component {...pageProps} />
          </Layout>
        </NotesContextProvider>
      </NotificationContextProvider>
    </AuthProvider>
  );
}

export default MyApp;
