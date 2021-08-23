import AuthenticationError from '@exceptions/Authentication';
import ClientError from '@exceptions/ClientError';
import connectDb from '@lib/connectDb';
import ProjectService from '@services/databases/ProjectService';
import TaskService from '@services/databases/TaskService';
import taskValidation from '@validations/task';
import { getSession } from 'next-auth/client';

async function handler(req, res) {
  const projectService = new ProjectService();
  const taskService = new TaskService();

  let session;
  let emailUser;
  try {
    session = await getSession({ req });
    emailUser = session.user.email;

    if (!session) {
      throw new AuthenticationError('No authenticated');
    }
  } catch (error) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
  }

  switch (req.method) {
    case 'PUT':
      try {
        const { projectId, taskId } = req.query;
        const { name, done } = req.body;

        taskValidation.validateTaskUpdatePayload(req.body);

        await projectService.checkExistProject(emailUser, projectId);
        await taskService.updateTask(emailUser, taskId, { name, done });

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

        await projectService.checkExistProject(emailUser, projectId);
        await taskService.deleteTask(emailUser, projectId, taskId, { deleteAll: false });

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
