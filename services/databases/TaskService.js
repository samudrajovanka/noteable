import InvariantError from '@exceptions/InvariantError';
import NotFoundError from '@exceptions/NotFoundError';
import Task from '@models/TaskModel';
import ProjectService from './ProjectService';

class TaskService {
  async createTask({ name }) {
    const dateNow = Date.now();

    const newTask = new Task({
      name,
      created_at: dateNow,
      updated_at: dateNow,
    });

    const task = await newTask.save();

    return task._id;
  }

  async updateTask(id, { name, done }) {
    const task = await Task.findById(id);

    if (!task) {
      throw new NotFoundError('Task not found');
    }

    task.name = name ?? task.name;
    task.done = done ?? task.done;

    await task.save();
  }

  async deleteTask(projectId, taskId, { deleteAll }) {
    const task = await Task.findById(taskId);

    if (!task) {
      throw new NotFoundError('Task not found');
    }

    const project = await new ProjectService().getProjectById(projectId);

    if (!deleteAll) {
      if (project.tasks.length - 1 === 0) {
        throw new InvariantError('Task is minimum 1 items');
      }
    }

    await Task.deleteOne({ _id: taskId });
  }
}

export default TaskService;
