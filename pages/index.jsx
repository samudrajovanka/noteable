/* eslint-disable react/no-unescaped-entities */
import Button from '@components/button';
import ProjectCard from '@components/projectCard';
import Subtitle from '@components/subtitle';
import Title from '@components/title';
import { fetchApi } from '@lib/fetching';
import { getSession } from 'next-auth/client';

function HomePage({ session, projects }) {
  return (
    <>
      <Title>Hello {session.user.name}</Title>
      <p className="mt-1">You have <span className="text-na-red font-bold">3 projets</span> that you haven’t finished yet. Let's finish it, don't forget!!!</p>

      <section className="mt-8">
        <Subtitle>Unfinished Projects</Subtitle>

        <div className="grid grid-cols-3 gap-4 my-2">
          <ProjectCard
            title="Project 1"
            tasksDone={1}
            totalTask={3}
            color="green"
            href="/"
          />

          <ProjectCard
            title="Project 1"
            tasksDone={1}
            totalTask={4}
            color="violet"
            href="/"
          />
        </div>
        <Button href="/" type="secondary">See More</Button>
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
  const projects = await fetchApi(`${process.env.BASE_URL}/projects`, {
    headers: { cookie },
  });

  return {
    props: {
      session,
      projects,
    },
  };
}

export default HomePage;
