import InvariantError from '@exceptions/InvariantError';
import { TasksPayloadSchema, TasksUpdatePayloadSchema, TaskUpdatePayloadSchema } from './schema';

const taskValidation = {
  validateTasksPayload: (payload) => {
    const validationResult = TasksPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validateTasksUpdatePayload: (payload) => {
    const validationResult = TasksUpdatePayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validateTaskUpdatePayload: (payload) => {
    const validationResult = TaskUpdatePayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

export default taskValidation;
