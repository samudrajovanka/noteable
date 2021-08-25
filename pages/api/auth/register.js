import ClientError from '@exceptions/ClientError';
import InvariantError from '@exceptions/InvariantError';
import connectDb from '@lib/connectDb';
import { VALIDATION_ERR } from '@lib/constantErrorType';
import { clientErrRes, notAllowedErrRes, serverErrRes } from '@lib/errorResponse';
import UserService from '@services/databases/UserService';
import userValidation from '@validations/user';

async function handler(req, res) {
  const userService = new UserService();

  switch (req.method) {
    case 'POST':
      try {
        const { fullname, email, password } = req.body;

        if (/[^A-Za-z ]/g.test(fullname)) {
          throw new InvariantError('"fullname" Full name must be alphabet', VALIDATION_ERR);
        }

        userValidation.validateUserPayload(req.body);

        await userService.emailExists(email);
        const userId = await userService.createUser({ fullname, email, password });

        return res.status(201).json({
          success: true,
          message: 'User successfull created',
          user: {
            id: userId,
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
