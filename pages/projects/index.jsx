import Button from '@components/button';
import GridProjects from '@components/gridProjects';
import Title from '@components/title';
import { fetchApi } from '@lib/fetching';
import { getSession } from 'next-auth/client';

function ProjectsPage({ projectsNew, projectsUncomplete, projectsComplete }) {
  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <Title>Projects</Title>
        <Button>New Project</Button>
      </div>

      <div className="mt-10 grid grid-cols-3 gap-4 min-h-screen">
        <GridProjects title="New" projects={projectsNew} />
        <GridProjects title="Uncomplete" projects={projectsUncomplete} />
        <GridProjects title="Complete" projects={projectsComplete} />
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

  const projectsNew = projects.filter((project) => project.status === 'new');
  const projectsUncomplete = projects.filter((project) => project.status === 'uncomplete');
  const projectsComplete = projects.filter((project) => project.status === 'complete');

  return {
    props: {
      session,
      projectsNew,
      projectsUncomplete,
      projectsComplete,
    },
  };
}

export default ProjectsPage;
