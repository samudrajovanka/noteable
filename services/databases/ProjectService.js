import InvariantError from '@exceptions/InvariantError';
import { mapProjectToModel } from '@lib/formatData';
import Project from '@models/ProjectModel';
import TaskService from './TaskService';

class ProjectService {
  async getProjects() {
    const projects = await Project.find().populate('tasks_id');

    const projectsFormated = projects.map((project) => {
      const doneTasks = project.tasks_id.filter((task) => task.done);
      return mapProjectToModel({ ...project._doc, doneTasks });
    });

    return projectsFormated;
  }

  async createProject({ name, tasks, color }) {
    const taskService = new TaskService();

    const tasksId = await Promise.all(tasks.map(async (task) => {
      const taskId = await taskService.createTask({ name: task });

      return taskId;
    }));
    console.log(tasksId);

    const newProject = new Project({
      name,
      task_id: tasksId,
      color,
    });

    const project = await newProject.save();

    return project._id;
  }
}

export default ProjectService;
