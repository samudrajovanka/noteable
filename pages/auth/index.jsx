import Image from 'next/image';
import Logo from '@components/logo';
import FormAuth from '@components/formAuth';
import { getSession } from 'next-auth/client';
import GuestRoute from '@components/guestRoute';

function AuthPage() {
  return (
    <GuestRoute>
      <div className="flex">
        <div className="w-2/5 relative h-screen overflow-hidden sticky top-0 bg-na-green rounded-r-3xl flex flex-col justify-center items-center gap-10">
          <div className="relative w-72 h-60">
            <Image
              src="/images/uncomplete-task.svg"
              alt="Uncomplete Task"
              layout="fill"
            />
          </div>
          <p className="w-1/3 text-white text-center text-xl">Create your own project and note</p>

          <div className="absolute w-60 h-60 top-0 left-0">
            <Image
              src="/images/vector/blobs-top.svg"
              alt="Blobs"
              layout="fill"
            />
          </div>

          <div className="absolute w-80 h-80 -bottom-20 left-0">
            <Image
              src="/images/vector/blobs-bottom.svg"
              alt="Blobs"
              layout="fill"
            />
          </div>
        </div>

        <div className="w-3/5 pt-3 pb-8 flex justify-center">
          <div className="flex w-10/12 flex-col gap-8">
            <Logo />
            <FormAuth />
          </div>
        </div>
      </div>
    </GuestRoute>
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

export default AuthPage;
