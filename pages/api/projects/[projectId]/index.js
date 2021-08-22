import AuthenticationError from '@exceptions/Authentication';
import ClientError from '@exceptions/ClientError';
import connectDb from '@lib/connectDb';
import ProjectService from '@services/databases/ProjectService';
import projectValidation from '@validations/project';
import taskValidation from '@validations/task';
import { getSession } from 'next-auth/client';

async function handler(req, res) {
  const projectService = new ProjectService();

  try {
    const session = await getSession({ req });

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
    case 'GET':
      try {
        const { projectId } = req.query;

        const project = await projectService.getProjectById(projectId);

        return res.status(200).json({
          success: true,
          data: {
            project,
          },
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
    case 'PUT':
      try {
        const { projectId } = req.query;

        const { name, status, tasks, color } = req.body;

        if (!name && !status && !color && (!tasks || tasks.length === 0)) {
          return res.status(200).json({
            success: true,
            message: 'Project is up to date',
          });
        }

        projectValidation.validateProjectUpdatePayload({ name, status, color });
        taskValidation.validateTasksUpdatePayload({ tasks });

        await projectService.updateProject(projectId, { name, status, tasks, color });

        return res.status(200).json({
          success: true,
          message: 'Project updated successfully',
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
        const { projectId } = req.query;

        await projectService.deleteProject(projectId);

        return res.status(200).json({
          success: true,
          message: 'Project deleted successfully',
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
