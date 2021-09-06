import FormNote from '@components/formNote';
import { getSession } from 'next-auth/client';

function NotesPage() {
  return (
    <FormNote
      type="create"
    />
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
    props: {
      session,
    },
  };
}

export default NotesPage;
