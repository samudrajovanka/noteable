import GuardRoute from '@components/guardRoute';
import { getSession } from 'next-auth/client';

function HomePage() {
  return (
    <GuardRoute>
      <>
      </>
    </GuardRoute>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default HomePage;
