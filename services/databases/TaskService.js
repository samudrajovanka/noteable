import InvariantError from '@exceptions/InvariantError';
import NotFoundError from '@exceptions/NotFoundError';
import { MIN_ERR } from '@lib/constantErrorType';
import Task from '@models/TaskModel';
import ProjectService from './ProjectService';

class TaskService {
  async createTask(email, { name }) {
    const dateNow = Date.now();

    const newTask = new Task({
      owner: email,
      name,
      created_at: dateNow,
      updated_at: dateNow,
    });

    const task = await newTask.save();

    return task._id;
  }

  async updateTask(email, id, { name, done }) {
    const tasks = await Task.find({ owner: email, _id: id });

    const task = tasks[0];
    if (!task) {
      throw new NotFoundError('Task not found');
    }

    task.name = name ?? task.name;
    task.done = done ?? task.done;

    await task.save();
  }

  async deleteTask(email, projectId, taskId, { deleteAll }) {
    const tasks = await Task.find({ owner: email, _id: taskId });

    const task = tasks[0];
    if (!task) {
      throw new NotFoundError('Task not found');
    }

    const project = await new ProjectService().getProjectById(email, projectId);

    if (!deleteAll) {
      if (project.tasks.length - 1 === 0) {
        throw new InvariantError('Task is minimum 1 items', MIN_ERR);
      }
    }

    await Task.deleteOne({ _id: taskId });
  }
}

export default TaskService;
