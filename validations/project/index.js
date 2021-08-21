import InvariantError from '@exceptions/InvariantError';
import { ProjectPayloadSchema, ProjectUpdatePayloadSchema } from './schema';

const projectValidation = {
  validateProjectPayload: (payload) => {
    const validationResult = ProjectPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validateProjectUpdatePayload: (payload) => {
    const validationResult = ProjectUpdatePayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

export default projectValidation;
