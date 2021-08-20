import InvariantError from '@exceptions/InvariantError';
import { TasksPayloadSchema } from './schema';

const taskValidation = {
  validateTasksPayload: (payload) => {
    const validationResult = TasksPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

export default taskValidation;
