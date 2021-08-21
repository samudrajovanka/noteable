import ClientError from '@exceptions/ClientError';
import connectDb from '@lib/connectDb';
import TaskService from '@services/databases/TaskService';
import taskValidation from '@validations/task';

async function handler(req, res) {
  const taskService = new TaskService();

  switch (req.method) {
    case 'PUT':
      try {
        const { taskId } = req.query;
        const { name, done } = req.body;

        taskValidation.validateTaskUpdatePayload(req.body);

        await taskService.updateTask(taskId, { name, done });

        return res.status(200).json({
          success: true,
          message: 'Task updated successfully',
        });
      } catch (error) {
        if (error instanceof ClientError) {
          return res.status(error.statusCode).json({
            success: false,
            message: error.message,
          });
        }

        return res.status(500).json({
          success: false,
          message: error.message,
        });
      }
    case 'DELETE':
      try {
        const { projectId, taskId } = req.query;

        await taskService.deleteTask(projectId, taskId);

        return res.status(200).json({
          success: true,
          message: 'Task deleted successfully',
        });
      } catch (error) {
        if (error instanceof ClientError) {
          return res.status(error.statusCode).json({
            success: false,
            message: error.message,
          });
        }

        return res.status(500).json({
          success: false,
          message: error.message,
        });
      }
    default:
      return res.status(400).json({
        success: false,
        message: 'Method not allowed',
      });
  }
}

export default connectDb(handler);
