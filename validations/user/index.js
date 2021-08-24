import InvariantError from '@exceptions/InvariantError';
import { UserPayloadSchema } from './schema';

const userValidation = {
  validateUserPayload: (payload) => {
    const validationResult = UserPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message, 'VALIDATION');
    }
  },
};

export default userValidation;
