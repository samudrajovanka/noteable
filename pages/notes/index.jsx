import Button from '@components/button';
import ListNote from '@components/listNote';
import Subtitle from '@components/subtitle';
import Title from '@components/title';
import NotesContext from '@context/notesContext';
import { fetchApi } from '@lib/fetching';
import { getSession } from 'next-auth/client';
import { useContext, useEffect } from 'react';

function NotesPage({ initNotes }) {
  const notesCtx = useContext(NotesContext);
  const { setNotes, notesPinned, notesUnpinned } = notesCtx;

  useEffect(() => {
    setNotes(initNotes);
  }, []);

  return (
    <div>
      <div className="flex justify-between mb-4 items-center">
        <Title>Notes</Title>
        <Button href="/notes/create" type="primary">
          New Note
        </Button>
      </div>
      <div className="mb-4">
        {notesPinned.length > 0 && (
          <>
            <Subtitle>Pinned</Subtitle>
            <ListNote notes={notesPinned} />
          </>
        )}
      </div>
      <div>
        {notesUnpinned.length > 0 && (
          <>
            {notesPinned.length > 0 && <Subtitle>Other</Subtitle>}
            <ListNote notes={notesUnpinned} />
          </>
        )}
      </div>
    </div>
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

  const { req } = context;
  const { cookie } = req.headers;
  const resultNotes = await fetchApi(`${process.env.BASE_URL}/notes`, {
    headers: { cookie },
  });

  const { notes } = resultNotes.data;
  // const notesPinned = notes.filter((note) => note.pinned);
  // const notesUnpinned = notes.filter((note) => !note.pinned);

  return {
    props: {
      initNotes: notes,
      // initNotesPinned: notesPinned,
      // initNotesUnpinned: notesUnpinned,
    },
  };
}

export default NotesPage;
