import Button from '@components/button';
import GridProjects from '@components/gridProjects';
import Title from '@components/title';
import ProjectsContext from '@context/projectsContext';
import { fetchApi } from '@lib/fetching';
import { getSession } from 'next-auth/client';
import { useContext, useEffect } from 'react';

function ProjectsPage({ initProjects }) {
  const projectsCtx = useContext(ProjectsContext);

  useEffect(() => {
    projectsCtx.setProjects(initProjects);
  }, []);

  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <Title>Projects</Title>
        <Button href="/projects/create">New Project</Button>
      </div>

      <div className="mt-10 grid grid-cols-3 gap-4 min-h-screen">
        <GridProjects title="New" projects={projectsCtx.projectsNew} />
        <GridProjects title="Uncomplete" projects={projectsCtx.projectsUncomplete} />
        <GridProjects title="Complete" projects={projectsCtx.projectsComplete} />
      </div>
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

  return {
    props: {
      session,
      initProjects: projects,
    },
  };
}

export default ProjectsPage;
