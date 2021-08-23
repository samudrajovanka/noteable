import { signOut, getSession } from 'next-auth/client';

function HomePage() {
  const handleLogout = () => {
    signOut();
  };

  return (
    <>
      <h1>Hello Noteable</h1>
      <button onClick={handleLogout}>sign out</button>
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

export default HomePage;
