import InvariantError from '@exceptions/InvariantError';
import { VALIDATION_ERR } from '@lib/constantErrorType';
import { TasksPayloadSchema, TasksUpdatePayloadSchema, TaskUpdatePayloadSchema } from './schema';

const taskValidation = {
  validateTasksPayload: (payload) => {
    const validationResult = TasksPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message, VALIDATION_ERR);
    }
  },
  validateTasksUpdatePayload: (payload) => {
    const validationResult = TasksUpdatePayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message, VALIDATION_ERR);
    }
  },
  validateTaskUpdatePayload: (payload) => {
    const validationResult = TaskUpdatePayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message, VALIDATION_ERR);
    }
  },
};

export default taskValidation;
