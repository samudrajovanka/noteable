import ProjectCard from '@components/projectCard';
import Subtitle from '@components/subtitle';

function GridProjects({ title, projects }) {
  return (
    <div className="bg-na-light-green p-4 rounded-lg h-full">
      <Subtitle>{title}</Subtitle>
      <div className="mt-4 flex flex-col gap-4">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            id={project.id}
            title={project.name}
            tasksDone={project.tasks.completed}
            totalTask={project.tasks.length}
            color={project.color}
            status={project.status}
          />
        ))}
      </div>
    </div>
  );
}

export default GridProjects;
