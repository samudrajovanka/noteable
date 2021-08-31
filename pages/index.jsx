/* eslint-disable react/no-unescaped-entities */
import Button from '@components/button';
import ListNote from '@components/listNote';
import ListProject from '@components/listProject';
import Subtitle from '@components/subtitle';
import Title from '@components/title';
import NotesContext from '@context/notesContext';
import { fetchApi } from '@lib/fetching';
import { getSession } from 'next-auth/client';
import { useContext, useEffect } from 'react';

function HomePage({ session, projectsUncomplete, initNotesPinned }) {
  const notesCtx = useContext(NotesContext);
  const { notesPinned, setNotesPinned } = notesCtx;

  useEffect(() => {
    setNotesPinned(initNotesPinned);
  }, []);

  return (
    <>
      <Title>Hello {session.user.name}</Title>
      {projectsUncomplete.length === 0 && (
        <p className="mt-1">You have no project that unfinished yet</p>
      )}

      {projectsUncomplete.length > 0 && (
        <p className="mt-1">You have <span className="text-na-red font-bold">{projectsUncomplete.length} projets</span> that you haven’t finished yet. Let's finish it, don't forget!!!</p>
      )}

      <section className="mt-8">
        <Subtitle>Unfinished Projects</Subtitle>
        <div className="mt-2">
          {projectsUncomplete.length > 0 && (
            <ListProject projects={projectsUncomplete} />
          )}
        </div>
        <Button href="/projects" type="secondary">See More Projects</Button>
      </section>

      <section className="mt-8">
        <Subtitle>Pinned Notes</Subtitle>
        <div className="mt-2">
          {notesPinned.length > 0 && (
            <ListNote notes={notesPinned} />
          )}
          {notesPinned.length === 0 && (
            <Button href="/notes" type="secondary">See More Notes</Button>
          )}
        </div>
      </section>
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

  const { req } = context;
  const { cookie } = req.headers;
  const resultProjects = await fetchApi(`${process.env.BASE_URL}/projects`, {
    headers: { cookie },
  });
  const { projects } = resultProjects.data;
  const projectsUncomplete = projects.filter((project) => project.status === 'uncomplete');

  const resultNotes = await fetchApi(`${process.env.BASE_URL}/notes`, {
    headers: { cookie },
  });
  const { notes } = resultNotes.data;
  const notesPinned = notes.filter((note) => note.pinned);

  return {
    props: {
      session,
      projectsUncomplete,
      initNotesPinned: notesPinned,
    },
  };
}

export default HomePage;
