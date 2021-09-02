import ProjectCard from '@components/projectCard';
import PropTypes from 'prop-types';

function ListProject({ projects }) {
  return (
    <div className="grid grid-cols-3 gap-4 my-2">
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
  );
}

ListProject.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ListProject;
