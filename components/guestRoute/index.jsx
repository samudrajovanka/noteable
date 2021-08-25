import { getSession } from 'next-auth/client';

function GuestRoute({ children }) {
  return (
    <>
      {children}
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default GuestRoute;
