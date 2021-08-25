import InvariantError from '@exceptions/InvariantError';
import { VALIDATION_ERR } from '@lib/constantErrorType';
import { ProjectPayloadSchema, ProjectUpdatePayloadSchema } from './schema';

const projectValidation = {
  validateProjectPayload: (payload) => {
    const validationResult = ProjectPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message, VALIDATION_ERR);
    }
  },
  validateProjectUpdatePayload: (payload) => {
    const validationResult = ProjectUpdatePayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message, VALIDATION_ERR);
    }
  },
};

export default projectValidation;
