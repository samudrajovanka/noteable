import AuthenticationError from '@exceptions/Authentication';
import ClientError from '@exceptions/ClientError';
import connectDb from '@lib/connectDb';
import { clientErrRes, notAllowedErrRes, serverErrRes } from '@lib/errorResponse';
import ProjectService from '@services/databases/ProjectService';
import projectValidation from '@validations/project';
import taskValidation from '@validations/task';
import { getSession } from 'next-auth/client';

async function handler(req, res) {
  const projectService = new ProjectService();

  let session;
  let emailUser;
  try {
    session = await getSession({ req });
    emailUser = session.user.email;

    if (!session) {
      throw new AuthenticationError('No authenticated');
    }
  } catch (error) {
    if (error instanceof ClientError) {
      return res.status(error.statusCode).json(clientErrRes(error));
    }

    return res.status(500).json(serverErrRes(error));
  }

  switch (req.method) {
    case 'GET':
      try {
        const projects = await projectService.getProjects(emailUser);

        return res.status(200).json({
          success: true,
          length: projects.length ?? 0,
          data: {
            projects,
          },
        });
      } catch (error) {
        if (error instanceof ClientError) {
          return res.status(error.statusCode).json(clientErrRes(error));
        }

        return res.status(500).json(serverErrRes(error));
      }
    case 'POST':
      try {
        const { name, tasks, color } = req.body;

        projectValidation.validateProjectPayload({ name, color });
        taskValidation.validateTasksPayload({ tasks });

        const projectId = await projectService.createProject(emailUser, { name, tasks, color });

        return res.status(201).json({
          success: true,
          message: 'Project successfull created',
          project: {
            id: projectId,
          },
        });
      } catch (error) {
        if (error instanceof ClientError) {
          return res.status(error.statusCode).json(clientErrRes(error));
        }

        return res.status(500).json(serverErrRes(error));
      }
    default:
      return res.status(400).json(notAllowedErrRes());
  }
}

export default connectDb(handler);
