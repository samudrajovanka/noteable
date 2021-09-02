import { fetchApi } from '@lib/fetching';

const { createContext, useState, useEffect } = require('react');

const ProjectsContext = createContext({
  projects: [],
  setProjcets: (project) => {},
  projectsNew: [],
  setProjectsNew: (project) => {},
  projectsUncomplete: [],
  setProjectsUncomplete: (project) => {},
  projectsComplete: [],
  setProjectsComplete: (project) => {},
  addProject: (project) => {},
  updateProject: (id, data) => {},
  deleteProject: (projectId) => {},
});

export const ProjectsContextProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [projectsNew, setProjectsNew] = useState([]);
  const [projectsUncomplete, setProjectsUncomplete] = useState([]);
  const [projectsComplete, setProjectsComplete] = useState([]);

  useEffect(() => {
    setProjectsNew(projects.filter((project) => project.status === 'new'));
    setProjectsUncomplete(projects.filter((project) => project.status === 'uncomplete'));
    setProjectsComplete(projects.filter((project) => project.status === 'complete'));
  }, [projects]);

  const addProject = async (project) => {
    const result = await fetchApi('/api/projects', {
      method: 'POST',
      body: project,
    });

    if (result.status) {
      setProjects([...projects, project]);
    }

    return result;
  };

  const updateProject = async (id, data) => {
    const result = await fetchApi(`/api/projects/${id}`, {
      method: 'PUT',
      body: data,
    });

    if (result.success) {
      setProjects((curEl) => {
        const index = curEl.findIndex((el) => el.id === id);
        const newEl = [...curEl];
        newEl[index] = {
          ...newEl[index],
          ...data,
        };

        return newEl;
      });
    }

    return result;
  };

  const deleteProject = async (projectId) => {
    const result = await fetchApi(`/api/projects/${projectId}`, {
      method: 'DELETE',
    });

    if (result.success) {
      setProjects((curEl) => curEl.filter((el) => el.id !== projectId));
    }

    return result;
  };

  const context = {
    projects,
    setProjects,
    projectsNew,
    setProjectsNew,
    projectsUncomplete,
    setProjectsUncomplete,
    projectsComplete,
    setProjectsComplete,
    addProject,
    updateProject,
    deleteProject,
  };

  return (
    <ProjectsContext.Provider value={context}>
      {children}
    </ProjectsContext.Provider>
  );
};

export default ProjectsContext;
