import ClientError from '@exceptions/ClientError';
import InvariantError from '@exceptions/InvariantError';
import connectDb from '@lib/connectDb';
import UserService from '@services/databases/UserService';
import userValidation from '@validations/user';

async function handler(req, res) {
  const userService = new UserService();

  switch (req.method) {
    case 'POST':
      try {
        const { fullname, email, password } = req.body;

        if (/[^A-Za-z ]/g.test(fullname)) {
          throw new InvariantError('"fullname" Full name must be alphabet', 'VALIDATION');
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
          return res.status(error.statusCode).json({
            success: false,
            message: error.message,
            type: error.type,
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
