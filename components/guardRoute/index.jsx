import { getSession } from 'next-auth/client';

function GuardRoute({ children }) {
  return (
    <>
      {children}
    </>
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

export default GuardRoute;
