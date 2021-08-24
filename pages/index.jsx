import { signOut, getSession } from 'next-auth/client';

function HomePage() {
  const handleLogout = () => {
    signOut();
  };

  // return (
  //   <>
  //     <h1>Hello Noteable</h1>
  //     <button onClick={handleLogout}>sign out</button>
  //   </>
  // );

  return (
    // <div className="flex">
    //   <div className="bg-na-red w-1/5 h-screen sticky top-0">1</div>
    //   <div className="w-full">
    //     <div className="bg-na-green h-12">2</div>
    //     <div className="bg-na-yellow">3</div>
    //   </div>
    // </div>
    <>
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
