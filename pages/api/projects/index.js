import ClientError from '@exceptions/ClientError';
import connectDb from '@lib/connectDb';
import ProjectService from '@services/databases/ProjectService';
import projectValidation from '@validations/project';
import taskValidation from '@validations/task';

async function handler(req, res) {
  const projectService = new ProjectService();

  switch (req.method) {
    case 'GET':
      try {
        const projects = await projectService.getProjects();

        return res.status(200).json({
          success: true,
          length: projects.length ?? 0,
          data: {
            projects,
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
    case 'POST':
      try {
        const { name, tasks, color } = req.body;

        projectValidation.validateProjectPayload({ name, color });
        taskValidation.validateTasksPayload({ tasks });

        const projectId = await projectService.createProject({ name, tasks, color });

        return res.status(201).json({
          success: true,
          message: 'Project successfull created',
          data: {
            id: projectId,
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
    default:
      return res.status(400).json({
        success: false,
        message: 'Method not allowed',
      });
  }
}

export default connectDb(handler);
