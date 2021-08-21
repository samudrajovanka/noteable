import InvariantError from '@exceptions/InvariantError';
import NotFoundError from '@exceptions/NotFoundError';
import { mapProjectToModel, mapProjectToModelFull } from '@lib/formatData';
import Project from '@models/ProjectModel';
import TaskService from './TaskService';

class ProjectService {
  constructor() {
    this._taskService = new TaskService();
  }

  async getProjects() {
    const projects = await Project.find().populate('tasks_id');

    const projectsFormated = projects.map((project) => {
      const doneTasks = project.tasks_id.filter((task) => task.done);
      return mapProjectToModel({ ...project._doc, doneTasks });
    });

    return projectsFormated;
  }

  async createTasks(tasks) {
    const tasksId = await Promise.all(tasks.map(async (task) => {
      const taskId = await this._taskService.createTask({ name: task });

      return taskId;
    }));

    return tasksId;
  }

  async createProject({ name, tasks, color }) {
    const tasksId = await this.createTasks(tasks);

    const newProject = new Project({
      name,
      tasks_id: tasksId,
      color,
    });

    const project = await newProject.save();

    return project._id;
  }

  async getProjectById(id) {
    const project = await Project.findById(id).populate('tasks_id');

    if (!project) {
      throw new NotFoundError('Project not found');
    }

    const doneTasks = project.tasks_id.filter((task) => task.done);

    return mapProjectToModelFull({ ...project._doc, doneTasks });
  }

  async updateProject(id, { name, status, tasks, color }) {
    const project = await Project.findById(id);

    if (!project) {
      throw new NotFoundError('Project not found');
    }

    if (tasks) {
      if (project.tasks_id.length + tasks.length > 30) {
        throw new InvariantError('Task is maximum 30 items');
      }
    }

    let tasksId = [];
    if (tasks) {
      tasksId = await this.createTasks(tasks);
    }

    project.name = name ?? project.name;
    project.status = status ?? project.status;
    project.tasks_id = [...project.tasks_id, ...tasksId];
    project.color = color ?? project.color;
    project.updated_at = new Date();

    await project.save();
  }

  async deleteProject(id) {
    const project = await Project.findById(id);

    if (!project) {
      throw new NotFoundError('Project not found');
    }

    await Promise.all(project.tasks_id.map(async (taskId) => {
      await this._taskService.deleteTask(id, taskId, { deleteAll: true });
    }));

    await Project.deleteOne({ _id: id });
  }
}

export default ProjectService;
