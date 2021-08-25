import InvariantError from '@exceptions/InvariantError';
import NotFoundError from '@exceptions/NotFoundError';
import { MAX_ERR } from '@lib/constantErrorType';
import { mapProjectToModel, mapProjectToModelFull } from '@lib/formatData';
import Project from '@models/ProjectModel';
import TaskService from './TaskService';

class ProjectService {
  constructor() {
    this._taskService = new TaskService();
  }

  async getProjects(email) {
    const projects = await Project.find({ owner: email }).sort({ created_at: 'desc' })
      .populate('tasks_id');

    console.log(projects);
    const projectsFormated = projects.map((project) => {
      const doneTasks = project.tasks_id.filter((task) => task.done);
      return mapProjectToModel({ ...project._doc, doneTasks });
    });

    return projectsFormated;
  }

  async createTasks(email, tasks) {
    const tasksId = await Promise.all(tasks.map(async (task) => {
      const taskId = await this._taskService.createTask(email, { name: task });

      return taskId;
    }));

    return tasksId;
  }

  async createProject(email, { name, tasks, color }) {
    const projectsExist = await Project.find({ owner: email });

    if (projectsExist.length + 1 > 31) {
      throw new InvariantError('Project is maximum 31 items', MAX_ERR);
    }

    const tasksId = await this.createTasks(email, tasks);

    const dateNow = Date.now();

    const newProject = new Project({
      owner: email,
      name,
      tasks_id: tasksId,
      color,
      created_at: dateNow,
      updated_at: dateNow,
    });

    const project = await newProject.save();

    return project._id;
  }

  async getProjectById(email, id) {
    const projects = await Project.find({ owner: email, _id: id }).populate('tasks_id');

    const project = projects[0];

    if (!project) {
      throw new NotFoundError('Project not found');
    }

    const doneTasks = project.tasks_id.filter((task) => task.done);

    return mapProjectToModelFull({ ...project._doc, doneTasks });
  }

  async updateProject(email, id, { name, status, tasks, color }) {
    const projects = await Project.find({ owner: email, _id: id });

    const project = projects[0];
    if (!project) {
      throw new NotFoundError('Project not found');
    }

    if (tasks) {
      if (project.tasks_id.length + tasks.length > 31) {
        throw new InvariantError('Task is maximum 30 items', MAX_ERR);
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

  async deleteProject(email, id) {
    const projects = await Project.find({ owner: email, _id: id });

    const project = projects[0];
    if (!project) {
      throw new NotFoundError('Project not found');
    }

    await Promise.all(project.tasks_id.map(async (taskId) => {
      await this._taskService.deleteTask(email, id, taskId, { deleteAll: true });
    }));

    await Project.deleteOne({ _id: id });
  }

  async checkExistProject(email, id) {
    const projects = await Project.find({ owner: email, _id: id });

    const project = projects[0];
    if (!project) {
      throw new NotFoundError('Project not found');
    }

    return true;
  }
}

export default ProjectService;
