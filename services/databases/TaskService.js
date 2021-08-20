import Task from '@models/TaskModel';

class TaskService {
  async createTask({ name }) {
    const newTask = new Task({
      name,
    });

    const task = await newTask.save();

    return task._id;
  }
}

export default TaskService;
