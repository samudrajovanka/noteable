import { fetchApi } from '@lib/fetching';
import { getSession } from 'next-auth/client';
import FormNote from '@components/formNote';

function EditNotePage({ note }) {
  return (
    <FormNote
      type="edit"
      note={note}
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

  const { noteId } = context.query;

  const { req } = context;
  const { cookie } = req.headers;
  const resultNotes = await fetchApi(`${process.env.BASE_URL}/notes/${noteId}`, {
    headers: { cookie },
  });

  const { note } = resultNotes.data;

  return {
    props: {
      session,
      note,
    },
  };
}

export default EditNotePage;
