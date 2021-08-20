import InvariantError from '@exceptions/InvariantError';
import { ProjectPayloadSchema } from './schema';

const projectValidation = {
  validateProjectPayload: (payload) => {
    const validationResult = ProjectPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

export default projectValidation;
