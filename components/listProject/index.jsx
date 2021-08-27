import ProjectCard from '@components/projectCard';
import PropTypes from 'prop-types';

function ListProject({ projects }) {
  return (
    <div className="grid grid-cols-3 gap-4 my-2">
      {projects && projects.map((project) => (
        <ProjectCard
          key={project.id}
          title={project.name}
          tasksDone={project.tasksDone}
          totalTask={project.totalTask}
          color={project.color}
          href="/"
        />
      ))}
    </div>
  );
}

ListProject.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ListProject;
